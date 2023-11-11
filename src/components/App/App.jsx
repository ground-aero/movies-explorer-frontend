import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as authApi from '../../utils/AuthApi';

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({name: '', email: ''});  // Стейт, отвечающий за данные текущего пользователя
    const [loggedIn, setLoggedIn] = useState(false);
    /** Состояние массива карточек */
    const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
    const [allCards, setAllCards] = useState([]);
    const [isSearchedCards, setIsSearchedCards] = useState([]);
    const [isSavedCards, setIsSavedCards] = useState([])
    // console.log(cards);

    const [isLoading, setIsLoading] = useState(false); /** для отслеживания состояния загрузки во время ожидания ответа от сервера */
    const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [errorApi, setErrorApi] = useState(null);
    const [errorSearchApi, setErrorSearchApi] = useState(null);

    useEffect(() => { /** Проверяем токен, получаем email */
    handleTokenCheck()
        localStorage.setItem('loggedIn', loggedIn.toString()) // true
    }, [loggedIn]);

    // useEffect(() => {
    //     if (loggedIn) {
    //         mainApi.getUser()
    //             .then((res) => {
    //                 console.log(res.data.name) // current user's name, _id, email,...
    //                 setCurrentUser({name: res.data.name, email: res.data.email})
    //                 // console.log(currentUser)
    //                 // navigate('/movies', {replace: true})
    //             })
    //             .catch((err) => {
    //                 console.log(`Ошибка загрузки данных текущего пользователя ${err}`)
    //             })
    //     } else {
    //         navigate('/signin', {replace: true});
    //     }
    // }, [loggedIn, navigate]);

    // useEffect(() => {
    //     if (loggedIn) {
    //         mainApi.getMyMovies()
    //             .then((res) => {
    //                 console.log(res)
    //                 navigate('/movies', {replace: true})
    //             })
    //             .catch((err) => {
    //                 console.log(`Ошибка загрузки фильмов ${err}`)
    //             })
    //     } else {
    //         navigate('/signup', {replace: true});
    //     }
    // }, [loggedIn, navigate]);

    // useEffect(() => {
    //     if (loggedIn) {
    //         navigate('/');
    //     } else {
    //         navigate('/signup', {replace: true});
    //     }
    // }, [loggedIn]);

    function handleRegister(name, email, password) {
        return authApi.register(name, email, password)
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
        return authApi.authorize(email, password)
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

    // Проверить валидность токена (авторизацию), запросом на сервер на: users/me
    function handleTokenCheck() { /** @endpoint: '/users/me' */
        let token = localStorage.getItem('token');
        if (token) { /** есть ли jwt токен в локальном хранилище браузера ? */
            authApi.checkToken(token)
                .then((res) => {
                    /** автологин. Чтобы после перезагрузки не выкидывало снова в логин */
                    // console.log(res.data) // { _id:..., name:..., email:... }
                    if (res.data) {
                        let userData = {
                            id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                        }
                        setCurrentUser(userData) // запись текущего пользака в глоб. контекст
                        setLoggedIn(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
    }

    function handleUpdateProfile(name, email) {
        setIsLoading(true) /** состояние для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */
        setIsUpdateProfile(true);

        return mainApi.patchUser(name, email)
            .then((updatedUser) => {
                  console.log(updatedUser.data)
                setCurrentUser(updatedUser.data)
                  console.log(currentUser)
            }).catch((err) => {
                console.log(`err при обновлении данных профиля ${err}`)
            }).finally(() => {setIsLoading(false)}) //** управяем состоянием/текстом кнопки сабмита */
        // closeAllPopups()
    }

    // ============================================================================================================ //

    function handleGetMovies() {
        setIsLoading(true) /** состояние для управления 'Loading...' */
        return moviesApi.getAllMovies()
            .then((res) => {
                  console.log(res) // все карточки (100) [{...}, {id:1, nameRU:'Роллинг', ...} ]
                setAllCards(res)
                // navigate('/movies', {replace: true})
            })
            .catch((err) => {
                console.log(`Ошибка загрузки фильмов ${err}`)
                setErrorSearchApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. \n Подождите немного и попробуйте ещё раз')
                let timer = setTimeout(() => {
                    setErrorSearchApi(null)
                    clearTimeout(timer)
                }, 5000)
            }).finally(() => {setIsLoading(false)})
    }
    // function handleGetMovies() {
    //     let searchInputString // ??
    //     let setIsValid // ??
    //     // if(!searchInputString) {
    //     //     setIsValid(false)
    //     // }
    //     if (allMovies.length === 0 && searchInputString) {
    //         moviesApi.getAllMovies()
    //             .then((res) => {
    //                 console.log(res)
    //                 setIsValid(true)
    //
    //                 setAllMovies(res)
    //                 localStorage.setItem(res, JSON.stringify(allMovies)) // ????
    //             })
    //             .catch((err) => {
    //                 console.log(`Ошибка загрузки фильмов ${err}`)
    //             });
    //     } else { handleSubmitSearch() }
    // }

    function handleSearchMovies(value) {
        setIsLoading(true) /** состояние для управления 'Loading...' */
        return moviesApi.getAllMovies()
            .then((movies) => {
                  console.log(movies)
                setErrorSearchApi(null)
                const searchedMovies = movies.filter((item) => { // массив найденных фильмов
                    return (item.nameRU.toLowerCase().includes(value) || item.nameEN.toLowerCase().includes(value))
                })
                  console.log(searchedMovies)
                if (searchedMovies.length) {
                    setIsSearchedCards(searchedMovies); // запись массива найденных фильмов в переменную 'cards'
                    localStorage.setItem('SearchStory', JSON.stringify(searchedMovies)) // запись найденных фильмов в localStorage
                }
                else setErrorSearchApi('Ничего не найдено')
            })
            .catch((err) => {
                console.log(`Ошибка поиска фильма: ${err}`)
                setErrorSearchApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. \nПодождите немного и попробуйте ещё раз')
                let timer = setTimeout(() => {
                    setErrorSearchApi(null)
                    clearTimeout(timer)
                }, 7000)
            }).finally(() => {setIsLoading(false)})
    }

    useEffect(() => {
        const SearchStory = localStorage.getItem('SearchStory'); /** проверка истории поиска */
        if (SearchStory) {
            const searchSaved = JSON.parse(SearchStory)
            setIsSearchedCards(searchSaved) /** перезапись фильмов из истории поиска в 'isSearchedCards' */
              console.log(isSearchedCards)
        }
    }, []);

    function handleSaveCard(movieData) {
        // const isSaved = card.likes.some((id) => id === currentUser._id);
        // Снова проверяем, есть ли уже лайк на этой карточке
        // const isSaved = movieData.owner === currentUser.id;
        mainApi
            .addMovie(movieData)
            // Отправляем запрос в API и получаем обновлённые данные карточки
            .then((addedCard) => { // data: {owner:.., _id:.., moviesId: 10, }
                movieData.owner = currentUser.id; // в запрос добавляем поле 'owner' = currentUser.id
                movieData._id = addedCard.data._id; //  в запрос добавляем поле '_id' = addedCard.data._id;
                    // console.log(movieData)

                const arrCards = isSavedCards.map(item => item) // создаем новый массив с добавленной карточкой
                arrCards.push(addedCard.data) // записываем новую карточку в созданный новый массив
                    console.log(arrCards)

                setIsSavedCards(arrCards) // записываем добавленную карточку в ['isSavedCards']
                    console.log(isSavedCards)
                    // console.log(arrCards)
                localStorage.setItem('addedCards', JSON.stringify(arrCards)) // в localStorage запись добавленной карточки
            })
            .catch((err) => {
                console.log(`Ошибка при сохранении карточки: ${err}`);
            });
    }

    function onLogout() {
        // localStorage.removeItem('token');
        localStorage.clear();
        setCurrentUser(null);
        setAllCards([])
        setIsSearchedCards([])
        setErrorApi(null)
        setErrorSearchApi(null)
        setLoggedIn(false);
        navigate('/', {replace: true});
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Routes>
                    {/* при загрузке App, путь по умолчанию / не имеет соотв роута. Настраиваем. */}
                    <Route exact path='/'
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
                    <Route path='/profile' element={
                        <>
                            <Header loggedIn={loggedIn} type='profile'/>
                            <Profile onUpdateProfile={handleUpdateProfile}
                                     currentUser={currentUser}
                                     onLogout={onLogout} />
                        </>
                    }
                    />

                    <Route path='/movies' element={
                        <>
                            <Header loggedIn={loggedIn} type='movies'/>
                            <Movies loggedIn={loggedIn} type='movies' searchedCards={isSearchedCards} onSearchMovies={handleSearchMovies}
                                    onGetMovies={handleGetMovies} onSaveCard={handleSaveCard} errorSearchApi={errorSearchApi} isLoading={isLoading}/>
                            <Footer/>
                        </>
                    }
                    />
                    <Route path='/saved-movies' element={
                        <>
                            <Header loggedIn={loggedIn} type='saved-movies'/>
                            <SavedMovies type='saved-movies' onSaveCard={handleSaveCard}
                                         searchedCards={isSearchedCards}
                                         savedCards={isSavedCards}
                            />
                            <Footer/>
                        </>
                    }
                    />

                    <Route path='*' element={<NotFound/>}/>

                </Routes>

            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
