import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate, useLocation} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoadingContext from '../../contexts/LoadingContext';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import Preloader from '../Preloader/Preloader';
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
import * as AuthApi from '../../utils/AuthApi';
import { normalizeCards } from '../../utils/utils.js';
import { SHORT_MOVIE } from '../../utils/constants.js';
import filterSearch from '../../utils/filterSearch';
import ProtectedRoute from '../../hoc/ProtectedRoute.js';

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const location = useLocation()

    const [currentUser, setCurrentUser] = useState({name: '', email: ''});
    const [loggedIn, setLoggedIn] = useState(false);

    /** Состояние массива карточек */
    const [isRawCards, setRawCards] = useState([]); // все карточки [] с Сервера bitFilms, которые нормализую
    const [isRenderMovies, setRenderMovies] = useState([]); //

    const [isSearchedMovies, setSearchedMovies] = useState([]); // [ найденные(мутиров.) картчки] --> /movies ]
    const [isShortMovies, setShortMovies] = useState([]); //
    const [isLikedMovies, setLikedMovies] = useState([]); // [ лайкнутые карточки ] --> /saved-movies
    const [isTempLikedMovies, setTempLikedMovies] = useState([]); // [ лайкнутые карточки ] --> /saved-movies


    const [isShortStatus, setShortStatus] = useState(false); // данные для фильтрации
    const [isSearchedWord, setSearchedWord] = useState('');

    const [isLoading, setLoading] = useState(false);
    /** для отслеживания состояния загрузки во время ожидания ответа от сервера */
    const [isUpdateProfile, setUpdateProfile] = useState(false);
    const [errorApi, setErrorApi] = useState(null);
    const [errorSearchApi, setErrorSearchApi] = useState(null);
    const [messageSuccess, setMessageSuccess] = useState(null);

    useEffect(() => { /** Проверяем токен, получаем email */
        handleTokenCheck()
        localStorage.setItem('loggedIn', loggedIn.toString()) // true
    }, [loggedIn]);

    function handleTokenCheck() { /** @endpoint: '/users/me' */
        let token = localStorage.getItem('token');
        if (token) {
            /** есть ли jwt токен в локальном хранилище браузера ? */
            AuthApi.checkToken(token)
                .then((res) => {
                    /** автологин. Чтобы после перезагрузки не выкидывало снова в логин */
                    // console.log(res.data) // { _id:..., name:..., email:... }
                    if (res.data) {
                        let userData = {
                            id: res.data._id, // id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                        }
                        setCurrentUser(userData) // запись текущего пользака в глоб. контекст
                        setRawCards([])
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
       AuthApi.register(name, email, password)
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
        return AuthApi.authorize(email, password)
            .then((data) => {
                console.log(data); // --> {token: "eyJhbGciOi....eyJfa'}
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    setLoggedIn(true)

                    handleTokenCheck()
                    // setCurrentUser(data.name)
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
        /** состояние для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */
        setUpdateProfile(true);

        return MainApi.patchUser(name, email)
            .then((updatedUser) => {
                setMessageSuccess('Ваш профиль успешно сохранен')
                setTimeout(() => setMessageSuccess(null), 4000);
                 console.log(updatedUser.data)
                setCurrentUser(updatedUser.data)
                 console.log(currentUser)
            }).catch((err) => {
                console.log(`err при обновлении данных профиля ${err}`)
            }).finally(() => {
                setLoading(false)
            }) //** управяем состоянием/текстом кнопки сабмита */
        // closeAllPopups()
    }

    // ************************************************************************************************************* //

    useEffect(() => { // Для отображения на /movies
        const searchedMovies = localStorage.getItem('searchedMovies' || []) // проверяем наличие найденных фильмов
        if (searchedMovies) { // если в ЛС есть найденные фильмы,
            const searchedMovie = JSON.parse(searchedMovies)
            setSearchedMovies(searchedMovie || []) // то сохраняем их в стейт для текщуего рендера
              // console.log(isSearchedMovies)
        }
    }, []);

    useEffect(() => { // Для /savedMovies
        const renderMovies = localStorage.getItem('renderMovies' || []);
        if (renderMovies) { // если в ЛС есть сохраненные карточки,
            const renderedMovies = JSON.parse(renderMovies)
            setRenderMovies(renderedMovies) // то сохраняем их в стейт для текщуего рендеринга
            // console.log(isRenderMovies)
        }
    }, [])

    useEffect(() => { // Для /savedMovies: обновл. данные 'likedMovies'
        const likedMovies = localStorage.getItem('likedMovies' || [])
        if (likedMovies) { // если в ЛС есть сохраненные карточки,
            const savedCards = JSON.parse(likedMovies)
            setLikedMovies(savedCards.reverse()) // то сохраняем их в стейт для текщуего рендеринга
              console.log(isLikedMovies)
        }
        // else {
        //     const tempMovies = localStorage.getItem('tempLikedMovies' || [])
        //     if (tempMovies?.length) { // если в ЛС есть сохраненные карточки,
        //         const tepmCards = JSON.parse(tempMovies)
        //         setLikedMovies(tepmCards.reverse()) // то сохраняем их в стейт для текщуего рендеринга
        //         console.log(isLikedMovies)
        //     }
        // }
    }, [isLikedMovies?.length, isTempLikedMovies?.length])


    function getRawCardsAndMutate() { // нормализует сырой массив и сохраняет в стейт
                setLoading(true)
                setErrorSearchApi(null)
            // if (!localStorage.getItem('rawCards')) {
                MoviesApi.getAllMovies()
                    .then((raw) => { // получаем сырой массив
                        const normalizedCards = normalizeCards(raw); // мутируем сырой массив карточек
                        setRawCards(normalizedCards); // и в стейт
                        localStorage.setItem('rawCards', JSON.stringify(normalizedCards)); // и сохраняем в ЛС

                        // console.log('isRawCards state from getRawCardsAndMutate():', isRawCards)
                        // console.log('mutated card:', mutatedCards)
                    })
                    .catch(err => console.log('Ошибка при загрузке карточек со стороннего Сервера', err))
                    .finally(() => {
                        setLoading(false)
                    })
            // }
        setLoading(false)
    }
    // getRawCardsAndMutate()


    function handleSearchedMovies(value, isShort) { // По искомому слову + isShort, возвращает а)все искомые, или б)короткие //  .........(из нормализованных карточек)
        setErrorSearchApi(null)

        if (localStorage.getItem('rawCards')) { // vs // localStorage.getItem('rawCards')
            console.log('there are \'RawCards\' in localStorage (!)')

            // сначала фильтруем фильмы по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShortStatus
            const isRawCards = JSON.parse(localStorage.getItem('rawCards'))
              // console.log(isRawCards)

            // Получаем фильмы <= по искомому слову + по isShort // ............................... получаем пока фильмы [] по совпадению букв запроса (ПОКА БЕЗ СОРТ ПРОДОЛЖ.  // фильруем по короткометражкам: true/false // output ===> [{..},{..}]
            const filteredData = filterSearch(isRawCards, value, isShort);
                console.log(!isShort)

            if (filteredData?.length) {

                if (!isShort === false) {
                    // console.log(filteredData) // ??

                    setRenderMovies(filteredData) // запись найденных ф.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage
                    // setSearchedMovies(filteredData); // пере-запись всех найденных ф.
                    // localStorage.setItem('searchedMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage

                    setSearchedWord(value) ////////////////////////
                    localStorage.setItem('searchedWord', JSON.stringify(value))

                    setShortStatus(isShort)
                    localStorage.setItem('isShort', JSON.stringify(isShort))

                } else {
                        // console.log(filteredData)  // ??

                    setRenderMovies(filteredData) // запись найденных ф.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage
                    // setShortMovies(filteredData) // запись найденных коротких ф.
                    // localStorage.setItem('shortMovies', JSON.stringify(filteredData))

                    setSearchedWord(value)
                    localStorage.setItem('searchedWord', JSON.stringify(value))

                    setShortStatus(isShort)
                    localStorage.setItem('isShort', JSON.stringify(isShort))
                }

            } else setErrorSearchApi('Ничего не найдено')
            // console.log(filteredData)

            // localStorage.setItem('isShort', isShortStatus) // false/true
            // setShortStatus(isShortStatus)
            // console.log(isShortStatus)

            // const searchedMovies = isRawCards.filter((item) => { // массив найденных фильмов
            //     return (item.nameRU.toLowerCase().includes(value) || item.nameEN.toLowerCase().includes(value))
            // });
            // console.log('From Server: searchedMovies: ', searchedMovies)

        } else { // если есть фильмв в ЛС, то

            setLoading(true)
            MoviesApi.getAllMovies()
                .then((rawCards) => {

                        // console.log('From Server: rawCards: ', rawCards)
                    const normalizedCards = normalizeCards(rawCards); // мутируем сырой массив карточек
                        // console.log('normalizedCards : ', normalizedCards)
                    // console.log('mutatedCards/ isRawCards: ', isRawCards)

                    // Получаем фильмы <= по искомому слову + по isShort
                    // console.log('isShort :-:', isShort)
                    const filteredData = filterSearch(normalizedCards, value, isShort);  // фильруем по короткометражкам: true/false
                    console.log('filteredData, isShort ::-::',filteredData, isShort)

                    if (filteredData?.length) {

                        localStorage.setItem('rawCards', JSON.stringify(normalizedCards)); // и сохраняем в ЛС
                        setRawCards(normalizedCards); // и в стейт

                        setRenderMovies(filteredData) // запись найденных ф.
                        localStorage.setItem('renderMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage

                        // setSearchedMovies(filteredData); // пере-запись найденных ф.
                        // localStorage.setItem('searchedMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage

                        setSearchedWord(value)
                        localStorage.setItem('searchedWord', JSON.stringify(value))
                        // localStorage.setItem('isShort', isShortStatus) // false/true
                        // setShortStatus(isShortStatus)

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

    function handleSearchLikedMovies(value, isShort) {
        setErrorSearchApi(null)
        // setSearchedWord('')

        if (localStorage.getItem('likedMovies')) {

             console.log(`there are \'likedMovies\' in localStorage (!)`) // сначала фильтруем фильмы по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShortStatus
            const isRawLikedCards = JSON.parse(localStorage.getItem('likedMovies'))
             console.log('isRawLikedCards',isRawLikedCards)

            // Получаем фильмы <= по искомому слову + по isShort // ............................... получаем пока фильмы [] по совпадению букв запроса (ПОКА БЕЗ СОРТ ПРОДОЛЖ.  // фильруем по короткометражкам: true/false // output ===> [{..},{..}]
            const filteredData = filterSearch(isRawLikedCards, value, isShort);
            console.log(!isShort)

            if (filteredData?.length) {
                if (!isShort === false) {
                     console.log(filteredData) // ??

                    setTempLikedMovies(filteredData) // временный массив
                    // setLikedMovies(filteredData) // запись найденных ф.
                    // localStorage.setItem('likedMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage

                    // setSearchedWord(value)
                    // localStorage.setItem('searchedWord', JSON.stringify(value))

                    // setShortStatus(isShort)
                    // localStorage.setItem('isShort', JSON.stringify(isShort))

                } else {
                    console.log('filteredData - ', filteredData)

                    setTempLikedMovies(filteredData) // временный массив
                    // setLikedMovies(filteredData) // запись найденных ф.
                    // localStorage.setItem('likedMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage

                    // setSearchedWord(value)
                    // localStorage.setItem('searchedWord', JSON.stringify(value))

                    // setShortStatus(isShort)
                    // localStorage.setItem('isShort', JSON.stringify(isShort))
                }

            // console.log(filteredData)
            } else setErrorSearchApi('Ничего не найдено')

        }

    }

    console.log(errorSearchApi)

    function filterShort(movies) { // отбирает короткометражки: <--- movie < 40
        return movies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE; // 40
        });
    }

    function filterShortCheckbox() { // Запись в стейт и в ЛС короткометражек ???
        //   console.log(isSearchedMovies)
        // const shortMovies = filterShort(isSearchedMovies)
        // setShortMovies(shortMovies); // зд. установить и обновить стейт коротких
        // localStorage.setItem('shortMovies', JSON.stringify(shortMovies))
        setSearchedMovies(filterShort(isSearchedMovies));
        localStorage.setItem('searchedMovies', JSON.stringify(isSearchedMovies))
    }
    // console.log(isShortMovies) // ПЕРЕДАТЬ НА SearchForm ???

    // ---------------------------------------------------------------------------

    function handleSaveCard(card) { // Возвращает ........ Save = Like // Для постановки лайка/сохранения карточки фильма на /movie
        setLoading(true)
        return MainApi.postMyMovie(card) // на наш АПИ
            .then((likedMovie) => { // --> data: {owner:.., _id:.., moviesId: 10, }

                likedMovie.data.isLiked = true;
            setLikedMovies([likedMovie.data, ...isLikedMovies].reverse()) // записываем каждую добавленную карточку в стейт
                console.log('likedMovie.data:', likedMovie.data) // :
                console.log('from handleSaveCard(card): isLikedMovies: ', isLikedMovies)

            localStorage.setItem('likedMovies', JSON.stringify([likedMovie.data, ...isLikedMovies])) // в localStorage запись добавленной карточки
                console.log('from handleSaveCard(card): isLikedMovies: ', isLikedMovies)
            }).catch((err) => {
            console.log(`Ошибка при сохранении карточки: ${err}`);
        }).finally(() => {
            setLoading(false)
        });
    }

    // useEffect(() => {
    //             if (isTempLikedMovies?.length === 0) setErrorSearchApi('По данному поиску нет фильмов')
    // }, [isTempLikedMovies?.length])

    function handleDeleteCard(_id) {
        setLoading(true)
        MainApi.deleteMyMovie(_id)
            .then(() => {
                const restMoviesLiked = isLikedMovies.filter((movie) => movie._id !== _id);
                const restTempMoviesLiked = isTempLikedMovies.filter((movie) => movie._id !== _id);
                const tempSearchWord = localStorage.getItem('searchedWordLiked')
                  console.log(tempSearchWord)

                if (location.pathname === '/saved-movies') {
                    if (isTempLikedMovies?.length === 0 && tempSearchWord?.length === 0) {
                        setErrorSearchApi('Ничего не найдено')
                    } else {
                        setTempLikedMovies(restTempMoviesLiked);
                    }
                }

                setLikedMovies(restMoviesLiked);
                  console.log('otherLikedMovies', restMoviesLiked)
                localStorage.setItem('likedMovies', JSON.stringify([...restMoviesLiked]))
            })
            .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err}`);
            }).finally(() => {
            setLoading(false);
        })
    }


    function onLogout() {
        // localStorage.removeItem('token');
        setLoggedIn(false);
        localStorage.clear();

        setCurrentUser({name: '', email: ''});
        setRawCards([])
        setRenderMovies([])
        // setSearchedMovies([])
        setSearchedWord('')
        setLikedMovies([])
        // setShortStatus(false)
        setTempLikedMovies([])

        setErrorApi(null)
        setErrorSearchApi(null)
        navigate('/', {replace: true});
        setLoading(null)
    }

    // console.log(isRenderMovies)
    console.log(isLikedMovies)
    console.log(isTempLikedMovies)

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <LoadingContext.Provider value={isLoading}>
                    <SavedMoviesContext.Provider value={isLikedMovies}>
                <Routes>
                    {/* при загрузке App, путь по умолчанию / не имеет соотв роута. Настраиваем. */}
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

                                    onSubmit={handleSearchedMovies}
                                    renderMovies={isRenderMovies}

                                    searchedMovies={isSearchedMovies}
                                    shortMovies={isShortMovies}

                                    isSearchedWord={isSearchedWord}
                                    setSearchedWord={setSearchedWord}

                                    isShortStatus={isShortStatus}
                                    setShortStatus={setShortStatus}

                                    likedMovies={isLikedMovies}
                                    onSaveLikedCard={handleSaveCard}

                                    onDeleteCard={handleDeleteCard}
                                    errorSearchApi={errorSearchApi}

                                    filterShortCheckbox={filterShortCheckbox}
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

                                onSubmit={ handleSearchLikedMovies }

                                likedMovies={isLikedMovies}
                                temporaryLikedMovies={isTempLikedMovies}
                                errorSearchApi={errorSearchApi}

                                onSaveLikedCard={handleSaveCard}
                                onDeleteCard={handleDeleteCard}

                                filterShortCheckbox={filterShortCheckbox}
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
