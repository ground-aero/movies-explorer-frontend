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
import * as AuthApi from '../../utils/AuthApi';
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
    const [isRawCards, setRawCards] = useState([]); // все карточки [] с Сервера bitFilms (не нормализованные)
    const [isRenderMovies, setRenderMovies] = useState([]);

    const [isSearchedMovies, setSearchedMovies] = useState([]); // [ найденные(мутиров.) картчки] --> /movies ]
    const [isShortMovies, setShortMovies] = useState([]);
    const [isLikedMovies, setLikedMovies] = useState([]); // [ лайкнутые карточки ] --> /saved-movies
    const [isTempLikedMovies, setTempLikedMovies] = useState([]); // [ временные карточки ] --> /saved-movies

    const [isShortStatus, setShortStatus] = useState(false); // данные для фильтрации
    const [isSearchedWord, setSearchedWord] = useState('');

    const [isLoading, setLoading] = useState(false); // для состояния загрузки во время ожидания ответа от сервера
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
                    if (res.data) { // { _id:..., name:..., email:... }
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
        setUpdateProfile(true);

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

    useEffect(() => { // Для отображения на /movies
        const searchedMovies = localStorage.getItem('searchedMovies' || []) // проверяем наличие найденных ф.
        if (searchedMovies) { // если в ЛС есть найденные ф.
            const searchedMovie = JSON.parse(searchedMovies)
            setSearchedMovies(searchedMovie || []) // то сохраняем их в стейт для текщуего рендера
        }
    }, []);

    useEffect(() => { // Для /Movies
        const renderMovies = localStorage.getItem('renderMovies' || []);
        if (renderMovies) { // если в ЛС есть сохраненные карточки,
            const renderedMovies = JSON.parse(renderMovies)
            setRenderMovies(renderedMovies) // то сохраняем их в стейт для текщуего рендеринга
        }
    }, [])

    useEffect(() => { // Для /savedMovies: обновл. данные 'likedMovies'
        const likedMovies = localStorage.getItem('likedMovies' || [])
        if (likedMovies) { // если в ЛС есть сохраненные карточки,
            const savedCards = JSON.parse(likedMovies)
            setLikedMovies(savedCards.reverse()) // то сохраняем их в стейт для текщуего рендеринга
        }
    }, [isLikedMovies?.length, isTempLikedMovies?.length])

    // По искомому слову + isShort. Возвращает а)все искомые, или б)короткие ф. (из нормализованных карточек)
    function handleSearchedMovies(value, isShort) {
        setErrorSearchApi(null)

        if (localStorage.getItem('rawCards')) { // Если ф. есть в ЛС
            const isRawCards = JSON.parse(localStorage.getItem('rawCards'))

            // фильтруем ф. по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShortStatus
            // Получаем ф. <= по искомому слову + по isShort
            const filteredData = filterSearch(isRawCards, value, isShort);
                console.log(!isShort)

            if (filteredData?.length) {

                if (!isShort === false) {

                    setRenderMovies(filteredData) // запись найденных ф.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData))

                    setSearchedWord(value)
                    localStorage.setItem('searchedWord', JSON.stringify(value))

                    setShortStatus(isShort)
                    localStorage.setItem('isShort', JSON.stringify(isShort))

                } else {

                    setRenderMovies(filteredData) // запись найденных ф.
                    localStorage.setItem('renderMovies', JSON.stringify(filteredData))

                    setSearchedWord(value)
                    localStorage.setItem('searchedWord', JSON.stringify(value))

                    setShortStatus(isShort)
                    localStorage.setItem('isShort', JSON.stringify(isShort))
                }

            } else setErrorSearchApi('Ничего не найдено')

        } else {

            setLoading(true)
            MoviesApi.getAllMovies()
                .then((rawCards) => {

                    const normalizedCards = normalizeCards(rawCards); // мутируем сырой массив карточек
                    const filteredData = filterSearch(normalizedCards, value, isShort);  // фильруем по короткометражкам: true/false
                    console.log('filteredData, isShort ::-::',filteredData, isShort)

                    if (filteredData?.length) {

                        localStorage.setItem('rawCards', JSON.stringify(normalizedCards)); // сохраняем
                        setRawCards(normalizedCards);

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

    function handleSearchLikedMovies(value, isShort) {
        setErrorSearchApi(null)

        if (localStorage.getItem('likedMovies')) {

             console.log(`there are \'likedMovies\' in localStorage (!)`) // сначала фильтруем фильмы по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShortStatus
            const isRawLikedCards = JSON.parse(localStorage.getItem('likedMovies'))
             console.log('isRawLikedCards',isRawLikedCards)

            // Получаем фильмы <= по искомому слову + по isShort
            const filteredData = filterSearch(isRawLikedCards, value, isShort);
            if (filteredData?.length) {
                if (!isShort === false) {
                     console.log(filteredData)
                    setTempLikedMovies(filteredData) // временный массив

                } else {
                    setTempLikedMovies(filteredData)
                }
            } else setErrorSearchApi('Ничего не найдено')
        }

    }
    // ------------------------------------------------------------------------------------------------------------

    function handleSaveCard(card) { // Постановка лайка/сохранения карточки фильма на /movies
        setLoading(true)
        return MainApi.postMyMovie(card) // на наш АПИ
            .then((likedMovie) => { // --> data: {owner:.., _id:.., moviesId: 10, }
                likedMovie.data.isLiked = true;
            setLikedMovies([likedMovie.data, ...isLikedMovies].reverse()) // записываем каждую добавленную карточку
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
        setLoggedIn(false);
        localStorage.clear();

        setCurrentUser({name: '', email: ''});
        setRawCards([])
        setRenderMovies([])
        setSearchedWord('')
        setLikedMovies([])
        setTempLikedMovies([])

        setErrorApi(null)
        setErrorSearchApi(null)
        navigate('/', {replace: true});
        setLoading(null)
    }
    // console.log('isTempLikedMovies, isTempLikedMovies: ', isTempLikedMovies, isLikedMovies)

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
