// Component Header - for Main page,
// should change its outlay, if user authorized or not.
import './Header.css';
import Navigation from '../Navigation/Navigation';

/** Шапка меняет отображение, if user authorized/not-authorized */
function Header({ loggedIn, type }) {

    return (
                // element={loggedIn ? <Navigate to='/main' replace /> : <Navigate to='/signin' replace />}
                <header className={`header header_wrap header_type_${ type }`}>

                    {/*{ 'loggedIn': App-->Header-->Navigation }*/}
                    {loggedIn
                        ? (<Navigation loggedIn={loggedIn} type={type} rights={'authorized'}/>)
                        : (<Navigation loggedIn={loggedIn} type={type} rights={'non-authorized'}/>)
                    }

                </header>
    );
}

export default Header;
