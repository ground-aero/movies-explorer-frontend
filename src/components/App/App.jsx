import React, {useState, useEffect, useContext} from 'react';
import {Routes, Route, useNavigate, Navigate, useLocation} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoadingContext from '../../contexts/LoadingContext';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import DisabledFormContext from '../../contexts/DisabledFormContext';
import AuthContext from '../../contexts/AuthContext';
import '../general/page.css'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { normalizeCards } from '../../utils/utils.js';
import filterSearch from '../../utils/filterSearch';
import {SCREEN_XL,SCREEN_LG,SCREEN_MD,SCREEN_SM,INIT_COUNT_XL,INIT_COUNT_LG,INIT_COUNT_MD,INIT_COUNT_SM} from '../../utils/constants'
import ProtectedRoute from '../../hoc/ProtectedRoute.js';

/** @returns {JSX.Element} */
function App() {
    const savedMoviesContext = useContext(SavedMoviesContext);
    const navigate = useNavigate();
    const location = useLocation()

    const [isWidth, setIsWidth] = useState(window.innerWidth);

    const [currentUser, setCurrentUser] = useState({name: '', email: ''});
    const [loggedIn, setLoggedIn] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'|| false));
    const [isDisabled, setDisabled] = useState(false);

    /** Состояние массива карточек */
    const [isRenderMovies, setRenderMovies] = useState([]); // [ найденные(мутиров.) карточки] --> /movies ]
    const [isAddCount, setIsAddCount] = useState(null); // инкремент кол-ва карточек

    const [isLikedMovies, setLikedMovies] = useState([]); // [ лайкнутые карточки ] --> /saved-movies
    const [isFoundLikedMovies, setFoundLikedMovies] = useState([]); // [ временные карточки ] --> /saved-movies

    const [isShortStatus, setShortStatus] = useState(false); // данные для фильтрации
    const [isSearchedWord, setSearchedWord] = useState('');

    const [isLoading, setLoading] = useState(false); // для состояния загрузки во время ожидания ответа от серв
    const [errorApi, setErrorApi] = useState(null);
    const [errorSearchApi, setErrorSearchApi] = useState(null);
    const [messageSuccess, setMessageSuccess] = useState(null);

    let initCount = null;
    if (location.pathname === '/saved-movies') {
        initCount = savedMoviesContext?.length
    } else {
        if (isWidth >= SCREEN_XL) { // 1250px
            initCount = INIT_COUNT_XL; // 16
        } else if (isWidth < SCREEN_XL && isWidth >= SCREEN_LG) { // 970px
            initCount = INIT_COUNT_LG; // 12
        } else if (isWidth < SCREEN_LG && isWidth >= SCREEN_MD) { // 730px
            initCount = INIT_COUNT_MD; // 8
        } else if (isWidth >= SCREEN_SM && isWidth < SCREEN_MD) {
            initCount = INIT_COUNT_SM; // 5
        }
    }

    useEffect(() => { /** Проверяем токен, получаем email */
        handleTokenCheck()
        localStorage.setItem('loggedIn', loggedIn.toString()) // true

        if (loggedIn) { // перегружаем сохраненные ф. с Сервера в ЛС и в стейт
            getSavedMovies();
        }
    }, [loggedIn]);

    useEffect(() => {
        const handleResize = (event) => {
            setIsWidth(event.target.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return (() => window.removeEventListener('resize', handleResize))
    },[])

    function handleTokenCheck() { /** @endpoint: '/users/me' */
    let token = localStorage.getItem('token');
        if (token) {
            MainApi.getUserAuth(token)
                .then((isValid) => {
                    /** автологин. Чтобы после перезагрузки не выкидывало снова в логин */
                      // console.log('isValid getUserAuth:', isValid.data)
                    if (isValid) { // { _id:..., name:..., email:... }
                        let userData = {
                            id: isValid.data._id, // id: res.data._id,
                            name: isValid.data.name,
                            email: isValid.data.email,
                        }
                        setCurrentUser(userData) // запись текущего пользака в глоб. контекст
                        setLoggedIn(true)
                        navigate(location.pathname, {replace: true}) // при перезагрузке, остаемся на той же странице
                    }
                })
                .catch((err) => {
                    setLoggedIn(false)
                    console.log(err)
                })
        }
    }

    function handleRegister(name, email, password) {
        setDisabled(true)
        MainApi.register(name, email, password)
            .then((res) => {
                console.log(res.data); // --> _id, name, email
                setLoggedIn(true)
                handleLogin(email, password)
            })
            .catch((err) => {
                console.log(`Ошибка регистрации: ${err}`)
                setErrorApi(err)
                let timer = setTimeout(() => {
                    setErrorApi(null)
                    clearTimeout(timer)
                }, 5000)
            })
            .finally(() => setDisabled(false))
    }

    function handleLogin(email, password) {
        setDisabled(true)

        if (!email || !password) {
            return;
        }
        MainApi.login(email, password)
            .then((data) => {
                // console.log(data); // --> {token: "eyJhbGciOi....eyJfa'}
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    setLoggedIn(true)

                    handleTokenCheck()
                    navigate('/movies', {replace: true})
                }
            })
            .catch((err) => {
                setErrorApi(err)
                console.log(`Ошибка логинизации: ${err}`)
                let timer = setTimeout(() => {
                    setErrorApi(null)
                    clearTimeout(timer)
                }, 5000)
            })
            .finally(() => setDisabled(false))
    }

    function handleUpdateProfile(name, email) {
        setDisabled(true)
        MainApi.patchUser(name, email)
            .then((updatedUser) => {
                setMessageSuccess('Ваш профиль успешно сохранен')
                setLoggedIn(true)
                setTimeout(() => setMessageSuccess(null), 5000);
                // console.log(updatedUser.data)
                setCurrentUser(updatedUser.data)
                // console.log(currentUser)
            }).catch((err) => {
                console.log(`err при обновлении данных профиля ${err}`)
            })
            .finally(() => setDisabled(false))

    }

    // ************************************************************************************************************* //

    useEffect(() => { // Для /Movies
        const renderMovies = JSON.parse(localStorage.getItem('renderMovies' || []));
        if (renderMovies) { // если в ЛС есть сохраненные карточки,
            setRenderMovies(renderMovies) // то сохраняем их в стейт для текщуего рендеринга
        }
    }, [])

    useEffect(() => { // Для /savedMovies: обновл. данные 'likedMovies'
        const likedMovies = JSON.parse(localStorage.getItem('likedMovies' || []))
        if (likedMovies) { // если в ЛС есть сохраненные карточки,
            setLikedMovies(likedMovies) // то сохраняем их в стейт для текщуего рендеринга
        }
    }, [])

    function getSavedMovies() { // с моего API перегружаю в стейт и в ЛС, для отображения в /saved-movies и в useEffect
        setLoading(true);
        MainApi
            .getMyMovies(localStorage.getItem('token'))
            .then((res) => {
                setLikedMovies(res.data.reverse()); // .reverse() __?? ---> в стейт
                localStorage.setItem('likedMovies', JSON.stringify(res.data)); // ---> в ЛС
            })
            .catch((err) => console.log(`Ошибка при запросе сохраненных фильмов: ${err}`))
            .finally(() => setLoading(false));
    }

    // По искомому слову + isShort. Возвращает а)все искомые, или б)короткие ф. (из нормализованных карточек)
    function handleSearchMovies(value, isShort) {
        setDisabled(true)
        setErrorSearchApi(null)
        setIsAddCount(initCount)

        if (localStorage.getItem('rawCards')) { // Если ф. есть в ЛС
            const normalizedCards = JSON.parse(localStorage.getItem('rawCards'))

            // Фильтр ф. по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShort
            // Получаем ф. <= по искомому слову + по isShort
            const filteredData = filterSearch(normalizedCards, value, isShort);

            if (filteredData?.length) {

                if (isShort === false) { // если тумблер 'false' <-- ( все ф.)

                    setShortStatus(isShort)
                    localStorage.setItem('isShort', JSON.stringify(isShort))

                    setRenderMovies(filteredData) // запись всех найденных ф.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData))

                    setSearchedWord(value)
                    localStorage.setItem('searchedWord', JSON.stringify(value))

                      // console.log('сработал длинный метр: isShort, value, filteredData', isShort, value, filteredData)
                } else {

                    setShortStatus(isShort) // 'true' ( ф. < 40 мин. )
                    localStorage.setItem('isShort', JSON.stringify(isShort))

                    setRenderMovies(filteredData) // запись найденных ф. < 40 мин.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData))

                    setSearchedWord(value)
                    localStorage.setItem('searchedWord', JSON.stringify(value))
                }

            } else setErrorSearchApi('Ничего не найдено.')

        } else {

            setLoading(true)
            MoviesApi.getAllMovies()
                .then((rawCards) => {

                    const normalizedCards = normalizeCards(rawCards); // мутируем сырой массив карточек
                    const filteredData = filterSearch(normalizedCards, value, isShort);  // фильруем по короткометражкам: true/false

                    if (filteredData?.length) {

                        localStorage.setItem('rawCards', JSON.stringify(normalizedCards)); // сохраняем

                        setRenderMovies(filteredData) // запись найденных ф.
                        localStorage.setItem('renderMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage

                        setSearchedWord(value)
                        localStorage.setItem('searchedWord', JSON.stringify(value))

                    } else setErrorSearchApi('Ничего не найдено.')
                })
                .catch((err) => {
                    console.log(`Ошибка поиска фильма: ${err}`)
                    setErrorSearchApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. \nПодождите немного и попробуйте ещё раз')
                    let timer = setTimeout(() => {
                        setErrorSearchApi(null)
                        clearTimeout(timer)
                    }, 5000)
                }).finally(() => {
                setLoading(false)
                setDisabled(false)
            })
        }
    }

    function handleSaveCard(card) { // Постановка лайка/сохранения карточки фильма на /movies
          console.log('like: вх.card', card)
        return MainApi.postMyMovie(card) // на свой АПИ
            .then((likedMovie) => { // --> data: {owner:.., _id:.., moviesId: 10, }
                  console.log('likedMovie.data', likedMovie.data)
                card.isLiked = true;
                likedMovie.data.isLiked = true; // меняю поле на --> isLiked: true
                card._id = likedMovie.data._id;

            setLikedMovies([likedMovie.data, ...isLikedMovies]) // запись каждой добавленной карточки
            localStorage.setItem('likedMovies', JSON.stringify([likedMovie.data, ...isLikedMovies]))
            }).catch((err) => {
            console.log(`Ошибка при сохранении карточки: ${err}`);
        })
    }

    // function defineId(_id) {
    //     console.log('define card:', _id)
    //     if (!_id) {
    //         _id = isLikedMovies.find((item) => item._id === _id);
    //     }
    // }
    // console.log('defineId(_id)', defineId(_id))

    function handleDeleteCard(_id) {
        console.log(_id)
        MainApi
            .deleteMyMovie(_id)
            // .then(() =>
            //     setLikedMovies(isLikedMovies.filter((item) => item._id !== card))
            // )
            // .then(() => {
            //     const savedList = JSON.parse(
            //         localStorage.getItem('likedMovies')
            //     ).filter((item) => item.movieId !== card);
            //     localStorage.setItem('likedMovies', JSON.stringify(savedList));
            // })
            // .then(() => {
            //     isLikedMovies.forEach((item, _ind) => {
            //         if (item.movieId === card) {
            //             isLikedMovies[_ind].isLiked = false;
            //         }
            //     });
            // })
            .then((movie) => {
                // likedMovie.data.isLiked = true; // меняем поле на --> isLiked: true
                const restMoviesLiked = isLikedMovies.filter((movie) => movie._id !== _id);
                 console.log(restMoviesLiked)

                setLikedMovies(restMoviesLiked);
                localStorage.setItem('likedMovies', JSON.stringify([...restMoviesLiked]))
                // setFoundLikedMovies(restMoviesLiked)
            })
            .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err}`);
            })
    }

    function onLogout() {
        setLoggedIn(false);
        localStorage.clear();

        setCurrentUser({name: '', email: ''});
        setRenderMovies([])
        setSearchedWord('')
        setLikedMovies([])
        setFoundLikedMovies([])

        setErrorApi(null)
        setErrorSearchApi(null)
        navigate('/', {replace: true});
        setLoading(null)
    }

    return (
        <>
            <AuthContext.Provider value={loggedIn}>
                <CurrentUserContext.Provider value={currentUser}>
                    <LoadingContext.Provider value={isLoading}>
                        <SavedMoviesContext.Provider value={isLikedMovies}>
                            <DisabledFormContext.Provider value={isDisabled}>
                    <Routes>
                        <Route exact path='/' index={true}
                               element={
                                   <>
                                       <Header loggedIn={loggedIn} type='land' onLogout={onLogout}/>
                                       <Main/>
                                       <Footer/>
                                   </>
                               }
                        />

                        <Route path='/signup' element={!loggedIn ? (<Register handleRegister={handleRegister} errorApi={errorApi} />) : (<Navigate to='/movies'/>)}/>
                        <Route path='/signin' element={!loggedIn ? (<Login handleLogin={handleLogin} errorApi={errorApi} />) : (<Navigate to='/movies'/>)}/>
                        <Route
                            path='/profile'
                            element={ loggedIn ?
                            (<>
                                <ProtectedRoute
                                loggedIn={loggedIn}
                                    component={Header}
                                    type={'profile'}
                                />
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={Profile}
                                    onSubmit={handleUpdateProfile}
                                    currentUser={currentUser}
                                    messageSuccess={messageSuccess}
                                    onLogout={onLogout}
                                />
                            </>) : <Navigate to='/signin'/>
                            }
                        />

                        <Route
                            path='/movies'
                            element={ loggedIn ?
                                (<>
                                    <ProtectedRoute
                                        loggedIn={loggedIn}
                                        component={Header}
                                        type={'movies'}
                                    />
                                    <ProtectedRoute
                                        loggedIn={loggedIn}
                                        component={Movies}
                                        type={'movies'}

                                        onSubmit={handleSearchMovies}
                                        renderMovies={isRenderMovies}
                                        initCount={initCount}

                                        isSearchedWord={isSearchedWord}
                                        setSearchedWord={setSearchedWord}
                                        isAddCount={isAddCount}
                                        setIsAddCount={setIsAddCount}

                                        isShort={isShortStatus}
                                        setShortStatus={setShortStatus}

                                        likedMovies={isLikedMovies}
                                        onSaveLikedCard={handleSaveCard}

                                        onDeleteCard={handleDeleteCard}
                                        errorSearchApi={errorSearchApi}
                                    />
                                    <ProtectedRoute
                                        loggedIn={loggedIn}
                                        component={Footer}
                                    />
                                </>) : (<Navigate to='/signin'/>)
                            }
                        />
                        <Route
                            path='/saved-movies'
                            element={ loggedIn ?
                            (<>
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={Header}
                                    type={'saved-movies'}
                                />
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={SavedMovies}
                                    type={'saved-movies'}

                                    likedMovies={isLikedMovies}
                                    isFoundLikedMovies={isFoundLikedMovies}
                                    setFoundLikedMovies={setFoundLikedMovies}
                                    errorSearchApi={errorSearchApi}
                                    setErrorSearchApi={setErrorSearchApi}

                                    onSaveLikedCard={handleSaveCard}
                                    onDeleteCard={handleDeleteCard}
                                />
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={Footer}
                                />
                            </>) : (<Navigate to='/signin'/>)
                        }
                        />

                        <Route path='*' element={<NotFound/>}/>

                    </Routes>

                            </DisabledFormContext.Provider>
                        </SavedMoviesContext.Provider>
                    </LoadingContext.Provider>
                </CurrentUserContext.Provider>
            </AuthContext.Provider>
        </>
    );
}

export default App;
