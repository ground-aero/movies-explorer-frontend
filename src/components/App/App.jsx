import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
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
    const [loggedIn, setLoggedIn] = useState(false);
    /** Состояние массива карточек */
    const [cards, setCards] = useState([]);
    // console.log(cards);
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false); /** для отслеживания состояния загрузки во время ожидания ответа от сервера */
    const [IsUpdateProfile, setIsUpdateProfile] = useState(false);
    const [errorApi, setErrorApi] = useState(null);

    function handleRegister(name, email, password) {
        return authApi.register(name, email, password)
            .then((res) => {
                console.log(res); // --> data._id, data.name, data.email
                setEmail(res.data.email)
                setLoggedIn(true)
                navigate('/movies', {replace: true})
            })
            .catch((err) => {
                console.log(`Ошибка регистрации: ${err}`)
                setErrorApi(err)
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
                    setLoggedIn(true)
                    localStorage.setItem('token', data.token)
                    setEmail(email)
                    navigate('/movies', {replace: true})
                }
            })
            .catch((err) => {
                setErrorApi(err)
                console.log(`Ошибка логинизации: ${err}`)
            })
    }

    // Проверить валидность токена
    function handleTokenCheck(token) { /** @endpoint: '/users/me' */
        if (token) { /** есть ли jwt токен в локальном хранилище браузера ? */
        authApi.checkToken(token)
            .then((res) => {
                /** автологин. Чтобы после перезагрузки не выкидывало снова в логин*/
                console.log(res)
                if (res) {
                    setEmail(res.data.email)
                    setLoggedIn(true)
                    navigate('/movies', {replace: true})
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    useEffect(() => { /** Проверяем токен, получаем email */
    handleTokenCheck()
        // console.log(handleTokenCheck()) // дает undefined ?!!!
        localStorage.setItem('loggedIn', loggedIn.toString())
        // if (loggedIn)
    }, [loggedIn]);

    function onLogout() {
        localStorage.removeItem('token');
        setEmail(null);
        setLoggedIn(false);
        navigate('/', {replace: true});
    }

    function handleUpdateProfile(name, email) {
        setIsLoading(true) /** состояние для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */
        setIsUpdateProfile(true);
        // closeAllPopups()
    }

    function handleGetMovies() {
        return moviesApi.getAllMovies()
            .then((res) => {
                console.log(res)
                navigate('/movies', {replace: true})
            })
            .catch((err) => {
                console.log(`Ошибка загрузки фильмов ${err}`)
            })
    }

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

    return (
        <>
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

                <Route path='/signup' element={!loggedIn ? (<Register handleRegister={handleRegister} errorApi={errorApi}/>) : (<Navigate to='/movies'/>)}/>
                <Route path='/signin' element={!loggedIn ? (<Login handleLogin={handleLogin} errorApi={errorApi}/>) : (<Navigate to='/movies'/>)}/>
                <Route path='/profile' element={
                    <>
                        <Header loggedIn={loggedIn} type='profile'/>
                        <Profile onUpdateProfile={handleUpdateProfile} onLogout={onLogout}/>
                    </>
                }
                />

                <Route path='/movies' element={
                    <>
                        <Header loggedIn={loggedIn} type='movies'/>
                        <Movies loggedIn={loggedIn} type='movies' cards={cards} handleGetMovies={handleGetMovies}/>
                        <Footer/>
                    </>
                }
                />
                <Route path='/saved-movies' element={
                    <>
                        <Header loggedIn={loggedIn} type='saved-movies'/>
                        <SavedMovies type='saved-movies'/>
                        <Footer/>
                    </>
                        }
                />

                <Route path='*' element={<NotFound/>}/>

            </Routes>

        </>
    );
}

export default App;
