import React, {useEffect} from 'react';
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

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = React.useState(false);

    function handleLogin() {
        setLoggedIn(true);
        navigate('/', {replace: true});
    }

    function onLogout() {
        setLoggedIn(false);
        navigate('/signin', {replace: true});
    }

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
                        <Header
                            loggedIn={loggedIn}
                            onLogout={onLogout}
                        />
                        <Main/>
                        <Footer/>
                    </>
                       }
                />
                <Route path='/signin' element={<Login/>}/>
                <Route path='/signup' element={<Register/>}/>

                <Route path='/movies' element={<Movies/>}/>
                <Route path='/saved-movies' element={<SavedMovies/>}/>
                <Route path='/profile' element={<Profile/>}/>

            </Routes>

        </>
    );
}

export default App;
