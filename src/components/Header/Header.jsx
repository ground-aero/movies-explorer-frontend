// Component Header - for Main page,
// should change its outlay, if user authorized or not.
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';
import logoIcon from '../../images/logo.svg';

function Header(props) {
    // const accountEntry = (
    //     <div>accountEntry Block</div>
    // )

    return (
        // element={loggedIn ? <Navigate to='/main' replace /> : <Navigate to='/signin' replace />}
        <header className='header header_wrap header_type_authorized header_type_non-authorized'>

            {/* Логика переключения блока "Navigation" */}
            {/*{props.loggedIn ? <Navigation loggedIn={props.loggedIn}/> : accountEntry}*/}
            <Navigation loggedIn={props.loggedIn}/>

            {/*Шапка на главной странице, как и на других страницах, должна менять отображение,
            если пользователь авторизован или не авторизован.
            Такое поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то,
            что сама авторизация ещё не реализована.*/}

        </header>
    );
}

export default Header;
