// Component Header - for Main page,
// should change its outlay, if user authorized or not.
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';

/** Шапка на главной странице, как и на других страницах, должна менять отображение,
* если пользователь авторизован или не авторизован. */
function Header(props) {

    return (
        // element={loggedIn ? <Navigate to='/main' replace /> : <Navigate to='/signin' replace />}
        <header className='header header_wrap header_type_authorized header_type_non-authorized'>

            {/*{передаем переменную-состояния loggedIn дальше в компонент Navigation }*/}
            <Navigation loggedIn={props.loggedIn}/>

        </header>
    );
}

export default Header;
