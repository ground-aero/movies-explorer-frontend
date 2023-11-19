import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate, useLocation} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoadingContext from '../../contexts/LoadingContext';
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
import mainApi from '../../utils/MainApi';
import * as authApi from '../../utils/AuthApi';

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const location = useLocation()

    const [currentUser, setCurrentUser] = useState({name: '', email: ''});  // Стейт, отвечающий за данные текущего пользователя
    const [loggedIn, setLoggedIn] = useState(false);

    /** Состояние массива карточек */

    const [isLikedMovies, setLikedMovies] = useState([]); // [ лайкнутые карточки ] --> /saved-movies

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
                    // console.log(res.data) // { _id:..., name:..., email:... }
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


    // useEffect(() => { // проверяем наличие в ЛС загруженных на наш АПИ карточек, Для /movies
    //     const LoadedAllCards = localStorage.getItem('LoadedCards') // проверяем наличие в ЛС загруженных карточек
    //     if (LoadedAllCards) { // если они в ЛС есть,
    //         setLoadedAllCards(JSON.parse(LoadedAllCards)) // то сохраняем их в стейт для использования в ............
    //           console.log('from useEffect - isRawCards', isLoadedAllCards)
    //     } else {
    //         getRawCardsAndMutate(); // либо запрашиваем их на стороннем Сервере
    //     }
    // }, []);



    useEffect(() => { // Для /savedMovies
        const likedMovies = localStorage.getItem('likedMovies');
        if (likedMovies) { // если в ЛС есть сохраненные карточки,
            const savedCard = JSON.parse(likedMovies)
            setLikedMovies(savedCard || []) // то сохраняем их в стейт для текщуего рендеринга
              console.log(isLikedMovies)
        }
    }, [])

    // ---------------------------------------------------------------------------

    function handleSaveCard(card) { // Save = Like // Для постановки лайка/сохранения карточки фильма на /movie
        setLoading(true)
        return mainApi.postMyMovie(card) // на наш АПИ
            .then((likedMovie) => { // --> data: {owner:.., _id:.., moviesId: 10, }

                likedMovie.data.isLiked = true;
            setLikedMovies([likedMovie.data, ...isLikedMovies]) // записываем каждую добавленную карточку в стейт
                console.log('likedMovie.data:', likedMovie.data) // :
                console.log('from handleSaveCard(card): isLikedMovies: ', isLikedMovies)

            localStorage.setItem('likedMovies', JSON.stringify([likedMovie.data, ...isLikedMovies])) // в localStorage запись добавленной карточки
        }).catch((err) => {
            console.log(`Ошибка при сохранении карточки: ${err}`);
        }).finally(() => {
            setLoading(false)
        })
    }

    function handleDeleteCard(_id) {
        setLoading(true)
        mainApi.deleteMyMovie(_id)
            .then(() => {

                const otherLikedMovies = isLikedMovies.filter((movie) => movie._id !== _id);
                setLikedMovies(otherLikedMovies);
                  console.log('otherLikedMovies', otherLikedMovies)
                // достать из ЛС isLikedMovies' и из стейта и удалить

            })
            .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err}`);
            }).finally(() => {
                setLoading(false);
            })
    }



    function onLogout() {
        // localStorage.removeItem('token');
        localStorage.clear();
        setLoggedIn(false);

        setCurrentUser({name: '', email: ''});
        // setRawCards([])
        // setSearchedMovies([])
        // setSearchedWord([])
        setLikedMovies([])

        setErrorApi(null)
        setErrorSearchApi(null)
        navigate('/', {replace: true});
    }

    if (loggedIn === undefined) {
        return <Preloader />;
    } else
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
                                    isLoading={isLoading}

                                    onSaveLikedCard={handleSaveCard}
                                    isLikedMovies={isLikedMovies}
                                    onDeleteCard={handleDeleteCard}

                                    errorSearchApi={errorSearchApi}
                            />
                            <Footer/>
                        </>
                    }
                    />
                    <Route path='/saved-movies' element={
                        <>
                            <Header loggedIn={loggedIn} type='saved-movies'/>
                            <SavedMovies type='saved-movies'

                                         onSaveLikedCard={handleSaveCard}
                                         isLikedMovies={isLikedMovies}
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
