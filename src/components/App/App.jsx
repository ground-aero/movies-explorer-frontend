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
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js';
import {register, authorize, checkToken} from '../../utils/auth.js';

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

    function handleLogin() {
        setLoggedIn(true);
        navigate('/', {replace: true});
    }

    function onLogout() {
        setLoggedIn(false);
        navigate('/signin', {replace: true});
    }

    function handleRegister(name, email, password) {
        return register(name, email, password)
            .then((res) => {
                console.log(res);
                setEmail(res.data.email)
                setLoggedIn(true)
                navigate('/movies', {replace: true})
            })
            .catch((err) => {console.log(`Ошибка регистрации ${err}`)})
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

                <Route path='/signup' element={!loggedIn ? (<Register handleRegister={handleRegister}/>) : (<Navigate to='/'/>)}/>
                <Route path='/signin' element={!loggedIn ? (<Login/>) : (<Navigate to='/'/>)}/>
                <Route path='/profile' element={
                    <>
                        <Header loggedIn={loggedIn} type='profile'/>
                        <Profile onUpdateProfile={handleUpdateProfile} />
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
