import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate, useLocation} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoadingContext from '../../contexts/LoadingContext';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
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
import ProtectedRoute from '../../hoc/ProtectedRoute.js';

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const location = useLocation()

    const [currentUser, setCurrentUser] = useState({name: '', email: ''});
    const [loggedIn, setLoggedIn] = useState(false);

    /** Состояние массива карточек */
    const [isRenderMovies, setRenderMovies] = useState([]); // [ найденные(мутиров.) картчки] --> /movies ]

    const [isLikedMovies, setLikedMovies] = useState([]); // [ лайкнутые карточки ] --> /saved-movies
    const [isFoundLikedMovies, setFoundLikedMovies] = useState([]); // [ временные карточки ] --> /saved-movies

    const [isShortStatus, setShortStatus] = useState(false); // данные для фильтрации
    const [isSearchedWord, setSearchedWord] = useState('');

    const [isLoading, setLoading] = useState(false); // для состояния загрузки во время ожидания ответа от серв
    const [errorApi, setErrorApi] = useState(null);
    const [errorSearchApi, setErrorSearchApi] = useState(null);
    const [messageSuccess, setMessageSuccess] = useState(null);

    useEffect(() => { /** Проверяем токен, получаем email */
        handleTokenCheck()
        localStorage.setItem('loggedIn', loggedIn.toString()) // true

        if (loggedIn) { // перегружаем сохраненные ф. с Сервера в ЛС и в стейт
            getSavedMovies();
        }
    }, [loggedIn]);

    function handleTokenCheck() { /** @endpoint: '/users/me' */
    let token = localStorage.getItem('token');
        if (token) {
            /** есть ли jwt токен в локальном хранилище браузера ? */
            MainApi.getUserAuth(token)
                .then((res) => {
                    /** автологин. Чтобы после перезагрузки не выкидывало снова в логин */
                      // console.log('res getUserAuth:', res.data)
                    if (res) { // { _id:..., name:..., email:... }
                        let userData = {
                            id: res.data._id, // id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                        }
                        setCurrentUser(userData) // запись текущего пользака в глоб. контекст
                        setLoggedIn(true)
                    }
                })
                .catch((err) => {
                    setLoggedIn(false)
                    console.log(err)
                })
        }
    }

    function handleRegister(name, email, password) {
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
            });
    }

    function handleLogin(email, password) {
        if (!email || !password) {
            return;
        }
        return MainApi.login(email, password)
            .then((data) => {
                console.log(data); // --> {token: "eyJhbGciOi....eyJfa'}
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
    }

    function handleUpdateProfile(name, email) {
        setLoading(true)

        return MainApi.patchUser(name, email)
            .then((updatedUser) => {
                setMessageSuccess('Ваш профиль успешно сохранен')
                setTimeout(() => setMessageSuccess(null), 5000);
                console.log(updatedUser.data)
                setCurrentUser(updatedUser.data)
                console.log(currentUser)
            }).catch((err) => {
                console.log(`err при обновлении данных профиля ${err}`)
            }).finally(() => {
                setLoading(false)
            })
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
            setLikedMovies(likedMovies.reverse()) // то сохраняем их в стейт для текщуего рендеринга
        }
    }, [])

    // useEffect(() => { // Для /  обновл. данные 'likedMovies'
    //         setFoundLikedMovies(isFoundLikedMovies) // то сохраняем их в стейт для текщуего рендеринга
    // }, [isFoundLikedMovies, isLikedMovies])

    function getSavedMovies() { // с моего API перегружаю в стейт и в ЛС, для отображения в /saved-movies и в useEffect
        setLoading(true);
        MainApi
            .getMyMovies(localStorage.getItem('token'))
            .then((res) => {
                  // console.log('res', res.data)
                setLikedMovies(res.data.reverse()); // ---> в стейт
                localStorage.setItem('likedMovies', JSON.stringify(res.data)); // ---> в ЛС
                  // console.log('isLikedMovies', isLikedMovies)
            })
            .catch((err) => console.log(`Ошибка при запросе сохраненных фильмов: ${err}`))
            .finally(() => setLoading(false));
    }

    // По искомому слову + isShort. Возвращает а)все искомые, или б)короткие ф. (из нормализованных карточек)
    function handleSearchMovies(value, isShort) {
        setErrorSearchApi(null)

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

                      console.log('сработал длинный метр: isShort, value, filteredData', isShort, value, filteredData)
                } else {

                    setShortStatus(isShort) // 'true' ( ф. < 40 мин. )
                    localStorage.setItem('isShort', JSON.stringify(isShort))

                    setRenderMovies(filteredData) // запись найденных ф. < 40 мин.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData))

                    setSearchedWord(value)
                    localStorage.setItem('searchedWord', JSON.stringify(value))

                      console.log('сработал короткий метр: isShort, value, filteredData', isShort, value, filteredData)
                }

            } else setErrorSearchApi('Ничего не найдено.')

        } else {

            setLoading(true)
            MoviesApi.getAllMovies()
                .then((rawCards) => {

                    const normalizedCards = normalizeCards(rawCards); // мутируем сырой массив карточек
                    const filteredData = filterSearch(normalizedCards, value, isShort);  // фильруем по короткометражкам: true/false
                    // console.log('filteredData, isShort ::-::',filteredData, isShort)

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
                    }, 7000)
                }).finally(() => {
                setLoading(false)
            })
        }
    }

    // function handleSearchLikedMovies(value, isShort) { // по сабмиту поиска, храним во временном массиве, для текущ. рендеринга
    //     setErrorSearchApi(null)
    //
    //     if (localStorage.getItem('likedMovies')) {
    //
    //          console.log(`there are \'likedMovies\' in localStorage (!)`) // сначала фильтруем фильмы по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShort
    //         const likedMovies = JSON.parse(localStorage.getItem('likedMovies'))
    //         // const normalizedCards = JSON.parse(localStorage.getItem('rawCards'))
    //          console.log('likedMovies',likedMovies)
    //
    //         // Из массива 'likedMovies' получаем ф. <= по искомому слову + по isShort
    //         const filteredData = filterSearch(likedMovies, value, isShort);
    //
    //           console.log('liked: filteredData.length', filteredData)
    //          if (filteredData?.length) {
    //
    //             if (isShort === false) { // if 'false' == ( все ф. )
    //                 setFoundLikedMovies(filteredData) // все ф. --> во временный массив
    //                   console.log('сработали длинные: isShort, value, filteredData', isShort, value, filteredData)
    //
    //             } else { // ( короткие ф. )
    //                 setFoundLikedMovies(filteredData)
    //                   console.log('сработали короткие: isShort, value, filteredData', isShort, value, filteredData)
    //             }
    //         } else setErrorSearchApi('Ничего не найдено')
    //     }
    //
    // }
    // ------------------------------------------------------------------------------------------------------------

    function handleSaveCard(card) { // Постановка лайка/сохранения карточки фильма на /movies
        setLoading(true)
        return MainApi.postMyMovie(card) // на наш АПИ
            .then((likedMovie) => { // --> data: {owner:.., _id:.., moviesId: 10, }
                likedMovie.data.isLiked = true; // меняем поле на --> isLiked: true
            setLikedMovies([likedMovie.data, ...isLikedMovies].reverse()) // запись каждой добавленной карточки
            localStorage.setItem('likedMovies', JSON.stringify([likedMovie.data, ...isLikedMovies]))
            }).catch((err) => {
            console.log(`Ошибка при сохранении карточки: ${err}`);
        }).finally(() => {
            setLoading(false)
        });
    }

    function handleDeleteCard(_id) {
        setLoading(true)
        MainApi.deleteMyMovie(_id)
            .then((movie) => {
                // likedMovie.data.isLiked = true; // меняем поле на --> isLiked: true
                const restMoviesLiked = isLikedMovies.filter((movie) => movie._id !== _id);
                // const restTempMoviesLiked = isFoundLikedMovies.filter((movie) => movie._id !== _id);

                setLikedMovies(restMoviesLiked);
                  console.log('otherLikedMovies', restMoviesLiked)
                localStorage.setItem('likedMovies', JSON.stringify([...restMoviesLiked]))

                setFoundLikedMovies(restMoviesLiked)
            })
            .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err}`);
            }).finally(() => {
            setLoading(false);
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
    console.log('isFoundLikedMovies: ', isFoundLikedMovies)
    console.log('isLikedMovies: ', isLikedMovies)

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <LoadingContext.Provider value={isLoading}>
                    <SavedMoviesContext.Provider value={isLikedMovies}>
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
                        element={
                        <>
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
                        </>
                        }
                    />

                    <Route
                        path='/movies'
                        element={
                            <>
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

                                    isSearchedWord={isSearchedWord}
                                    setSearchedWord={setSearchedWord}

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
                            </>
                        }
                    />
                    <Route
                        path='/saved-movies'
                        element={
                        <>
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                component={Header}
                                type={'saved-movies'}
                            />
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                component={SavedMovies}
                                type={'saved-movies'}

                                // onSubmit={ handleSearchLikedMovies }

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
                        </>
                    }
                    />

                    <Route path='*' element={<NotFound/>}/>

                </Routes>

                    </SavedMoviesContext.Provider>
                </LoadingContext.Provider>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
