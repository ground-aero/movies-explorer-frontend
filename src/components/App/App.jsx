import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoadingContext from '../../contexts/LoadingContext';
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
import { mutateCards } from '../../utils/utils.js';

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({name: '', email: ''});  // Стейт, отвечающий за данные текущего пользователя
    const [loggedIn, setLoggedIn] = useState(false);

    /** Состояние массива карточек */
    const [isRawCards, setRawCards] = useState([]); // массив всех карточек с Сервера bitFilms...
    const [isLoadedAllCards, setLoadedAllCards] = useState([]); // массив всех загруженных карт

    const [isSearchedMovies, setSearchedMovies] = useState([]); // [ найденные(мутиров.) картчки] --> /movies ]
    const [isLikedMovies, setLikedMovies] = useState([]) // [ лайкнутые карточки ] --> /saved-movies
    // console.log(cards);

    const [isLoading, setLoading] = useState(false);
    /** для отслеживания состояния загрузки во время ожидания ответа от сервера */
    const [isUpdateProfile, setUpdateProfile] = useState(false);
    const [errorApi, setErrorApi] = useState(null);
    const [errorSearchApi, setErrorSearchApi] = useState(null);

    useEffect(() => {
        /** Проверяем токен, получаем email */
        handleTokenCheck()
        localStorage.setItem('loggedIn', loggedIn.toString()) // true
    }, [loggedIn]);

    // useEffect(() => { // getAllSetupInfo
    //     mainApi.getAllSetupData()
    // },[loggedIn, navigate])

    // useEffect(() => {
    //     if (loggedIn) {
    //         navigate('/');
    //     } else {
    //         navigate('/signup', {replace: true});
    //     }
    // }, [loggedIn]);

    function handleRegister(name, email, password) {
       authApi.register(name, email, password)
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
    function handleTokenCheck() {
        /** @endpoint: '/users/me' */
        let token = localStorage.getItem('token');
        if (token) {
            /** есть ли jwt токен в локальном хранилище браузера ? */
            authApi.checkToken(token)
                .then((res) => {
                    /** автологин. Чтобы после перезагрузки не выкидывало снова в логин */
                    console.log(res.data) // { _id:..., name:..., email:... }
                    if (res.data) {
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
                    console.log(err)
                })
        }
    }

    function handleUpdateProfile(name, email) {
        setLoading(true)
        /** состояние для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */
        setUpdateProfile(true);

        return mainApi.patchUser(name, email)
            .then((updatedUser) => {
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

    // ============================================================================================================ //

    // function handleGetMovies() {
    //     setLoading(true) /** состояние для управления 'Loading...' */
    //     return moviesApi.getAllMovies()
    //         .then((res) => {
    //               console.log(res) // все карточки (100) [{...}, {id:1, nameRU:'Роллинг', ...} ]
    //             // setAllCards(res)
    //             // navigate('/movies', {replace: true})
    //         })
    //         .catch((err) => {
    //             console.log(`Ошибка загрузки фильмов ${err}`)
    //             setErrorSearchApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. \n Подождите немного и попробуйте ещё раз')
    //             let timer = setTimeout(() => {
    //                 setErrorSearchApi(null)
    //                 clearTimeout(timer)
    //             }, 5000)
    //         }).finally(() => {setLoading(false)})
    // }
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

    useEffect(() => { // проверяем наличие в ЛС сырого массива, Для /movies
        const RawCards = localStorage.getItem('rawCards') // проверяем наличие в ЛС загруженных карточек
        if (RawCards) { // если они в ЛС есть,
            setRawCards(JSON.parse(RawCards)) // то сохраняем их в стейт для использования в ............
              console.log('from useEffect - isRawCards', isRawCards)
        } else {
            getRawCardsAndMutate(); // либо запрашиваем их на стороннем Сервере
        }
    }, []);

    // useEffect(() => { // проверяем наличие в ЛС загруженных на наш АПИ карточек, Для /movies
    //     const LoadedAllCards = localStorage.getItem('LoadedCards') // проверяем наличие в ЛС загруженных карточек
    //     if (LoadedAllCards) { // если они в ЛС есть,
    //         setLoadedAllCards(JSON.parse(LoadedAllCards)) // то сохраняем их в стейт для использования в ............
    //           console.log('from useEffect - isRawCards', isLoadedAllCards)
    //     } else {
    //         getRawCardsAndMutate(); // либо запрашиваем их на стороннем Сервере
    //     }
    // }, []);

    useEffect(() => { // Для отображения на /movies
        const searchedMovies = localStorage.getItem('searchedMovies') // проверяем наличие найденных фильмов
        if (searchedMovies) { // если в ЛС есть найденные фильмы,
            setSearchedMovies(JSON.parse(searchedMovies)) // то сохраняем их в стейт для текщуего рендера
              console.log(isSearchedMovies)
        }
    }, []);

    useEffect(() => { // Для /savedMovies
        const likedMovies = localStorage.getItem('likedMovies');
        if (likedMovies) { // если в ЛС есть сохраненные карточки,
            const savedCard = JSON.parse(likedMovies)
            setLikedMovies(savedCard || []) // то сохраняем их в стейт для текщуего рендеринга
              console.log(isLikedMovies)
        }
    }, [])

    function getRawCardsAndMutate() { // загрузка сырого массива фильмов (если они отсутствуют в ЛС)
                setLoading(true)
                setErrorSearchApi(null)
            // if (!localStorage.getItem('rawCards')) {
                moviesApi.getAllMovies()
                    .then((raw) => { // получаем сырой массив

                        const mutatedCards = mutateCards(raw); // мутируем сырой массив карточек
                        setRawCards(mutatedCards); // и в стейт
                        localStorage.setItem('rawCards', JSON.stringify(mutatedCards)); // и сохраняем в ЛС

                        console.log('isRawCards state from getRawCardsAndMutate():', isRawCards)
                        console.log('mutated card:', mutatedCards)
                    })
                    .catch(err => console.log('Ошибка при загрузке карточек со стороннего Сервера', err))
                    .finally(() => {
                        setLoading(false)
                    })
            // }
        setLoading(false)
    }
    // getRawCardsAndMutate()

    function handleSearchedMovies(value) { // поиск из уже мутированных карточек
        setLoading(true)
        setErrorSearchApi(null)

        // если в ЛС есть все сохраненные(мутированные) карточки, то по этому стейту и делаем поиск фильмов,
        //   которые потом загружаем в ЛС и стейт 'searchedMovies'

        if (!localStorage.getItem('rawCards')) {
            moviesApi.getAllMovies()
                .then((rawCards) => {

                       console.log('From Server: rawCards: ', rawCards)
                    const mutatedCards = mutateCards(rawCards); // мутируем сырой массив карточек
                        console.log('mutatedCards : ', mutatedCards)
                        console.log('mutatedCards/ isRawCards: ', isRawCards)
                    setRawCards(mutatedCards); // и в стейт
                    localStorage.setItem('rawCards', JSON.stringify(mutatedCards)); // и сохраняем в ЛС

                    const searchedMovies = mutatedCards.filter((item) => { // массив найденных фильмов
                        return (item.nameRU.toLowerCase().includes(value) || item.nameEN.toLowerCase().includes(value))
                    });
                      console.log('From Server: searchedMovies: ', searchedMovies)
                    if (searchedMovies.length) {
                        setSearchedMovies(searchedMovies); // запись [ найденных/мутир. фильмов] в стейт для /movies
                        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies)) // запись в ЛС
                    } else setErrorSearchApi('Ничего не найдено')
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

        } else {

              console.log('there are \'RawCards\' ')

            const searchedMovies = isRawCards.filter((item) => { // массив найденных фильмов
                return (item.nameRU.toLowerCase().includes(value) || item.nameEN.toLowerCase().includes(value))
            });
              console.log('From Server: searchedMovies: ', searchedMovies)
            setSearchedMovies(searchedMovies); // пере-запись массива найденных фильмов в переменную 'cards'
            localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies)) // пере-запись найденных фильмов в localStorage

            setLoading(false)
        }

    }

    // const checkIfLiked = () => {
    //     const likedCards = isSearchedMovies
    // }

    function handleSaveCard(card) { // Save = Like // Для постановки лайка/сохранения карточки фильма на /movie
        setLoading(true)
        return mainApi.postMyMovie(card)
            .then((addedCard) => { // --> data: {owner:.., _id:.., moviesId: 10, }

            setLikedMovies([addedCard.data, ...isLikedMovies]) // записываем каждую добавленную карточку в стейт
                console.log('const movieData:', addedCard.data)
                console.log('from handleSaveCard(card): isLikedMovies: ', isLikedMovies)

            localStorage.setItem('likedMovies', JSON.stringify([addedCard.data, ...isLikedMovies])) // в localStorage запись добавленной карточки
        }).catch((err) => {
            console.log(`Ошибка при сохранении карточки: ${err}`);
        }).finally(() => {
            setLoading(false)
        })
    }

    function handleDeleteCard(movieId) {
        setLoading(true)
        mainApi.deleteMyMovie(movieId)
            .then(() => {
                const otherSavedCards = isLikedMovies.filter((card) => card.id !== movieId);
                setLikedMovies(otherSavedCards);
            })
            .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err}`);
            }).finally(() => {
                setLoading(false);
            })
    }

    // function handleSaveCard(movieData) { // Save = Like // Для постановки лайка/сохранения карточки фильма на /movie
    //     mainApi
    //         .postMyMovie(movieData) // на наш API - @POST: сохраняем/создаем карточку в наш АПИ
    //         .then((addedCard) => { // --> data: {owner:.., _id:.., moviesId: 10, }
    //             movieData.owner = currentUser.id; // в новую карточку добавляем поля:'owner' = currentUser.id
    //             movieData._id = addedCard.data._id;
    //             addedCard.data.isSaved = true; // созд. поле isSaved: true
    //                 // console.log(movieData)
    //
    //             // const arrCards = isLikedMovies.map(item => item) // создаем новый пустой массив для добавления карточек
    //             // arrCards.push(addedCard.data) // записываем новую карточку в созданный выше массив
    //             //     console.log('my API -->: arrCards :', arrCards)
    //
    //             setLikedMovies([...arrCards]) // записываем каждую добавленную карточку в ['isLikedMovies']
    //                 console.log([...arrCards])
    //                 console.log('my API -->: isLikedMovies: ', [...isLikedMovies])
    //
    //             localStorage.setItem('likedMovies', JSON.stringify(arrCards)) // в localStorage запись добавленной карточки
    //         })
    //         .catch((err) => {
    //             console.log(`Ошибка при сохранении карточки: ${err}`);
    //         });
    // }

    function onLogout() {
        // localStorage.removeItem('token');
        localStorage.clear();
        setLoggedIn(false);

        setCurrentUser({name: '', email: ''});
        setRawCards([])
        setSearchedMovies([])
        setLikedMovies([])

        setErrorApi(null)
        setErrorSearchApi(null)
        navigate('/', {replace: true});
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <LoadingContext.Provider value={isLoading}>
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
                    <Route path='/profile' element={
                        <>
                            <Header loggedIn={loggedIn} type='profile'/>
                            <Profile onSubmit={handleUpdateProfile}
                                     currentUser={currentUser}
                                     onLogout={onLogout} />
                        </>
                    }
                    />

                    <Route path='/movies' element={
                        <>
                            <Header loggedIn={loggedIn} type='movies'/>
                            <Movies loggedIn={loggedIn} type='movies'
                                    searchedMovies={isSearchedMovies}

                                    onSubmit={handleSearchedMovies}
                                    onSaveLikedCard={handleSaveCard}
                                    savedCards={isLikedMovies}
                                    errorSearchApi={errorSearchApi}
                                    isLoading={isLoading}/>
                            <Footer/>
                        </>
                    }
                    />
                    <Route path='/saved-movies' element={
                        <>
                            <Header loggedIn={loggedIn} type='saved-movies'/>
                            <SavedMovies type='saved-movies'
                                         searchedMovies={isSearchedMovies}

                                         onSaveLikedCard={handleSaveCard}
                                         savedCards={isLikedMovies}
                                         setLikedMovies={setLikedMovies}

                                         onDeleteCard={handleDeleteCard}
                            />
                            <Footer/>
                        </>
                    }
                    />

                    <Route path='*' element={<NotFound/>}/>

                </Routes>

                </LoadingContext.Provider>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
