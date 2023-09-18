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
import NotFound from '../NotFound/NotFound';

/** @returns {JSX.Element} */
function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = React.useState(true);

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
                        <Header loggedIn={loggedIn} type={'land'} onLogout={onLogout}/>
                        <Main/>
                        <Footer/>
                    </>
                       }
                />
                <Route path='/signin' element={!loggedIn ? (<Login/>) : (<Navigate to='/'/>)}/>
                <Route path='/signup' element={!loggedIn ? (<Register/>) : (<Navigate to='/'/>)}/>

                <Route path='/movies' element={
                    <>
                        <Header loggedIn={loggedIn} type={'movies'}/>
                        <Movies loggedIn={loggedIn} type='movies'/>
                        <Footer/>
                    </>
                }
                />
                <Route path='/saved-movies' element={
                    <>
                        <Header loggedIn={loggedIn} type={'saved-movies'}/>
                        <SavedMovies type='saved-movies'/>
                        <Footer/>
                    </>
                        }
                />
                <Route path='/profile' element={
                    <>
                        <Header
                            loggedIn={loggedIn}
                            type={'profile'}
                        />
                        <Profile/>
                    </>
                }
                />
                <Route path='*' element={<NotFound/>}/>

            </Routes>

        </>
    );
}

export default App;
