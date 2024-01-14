// Component Header - for Main page,
// should change its outlay, if user authorized or not.
import {useContext} from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import AuthContext from '../../contexts/AuthContext';

function Header({ type }) {

    const loggedIn = useContext(AuthContext);

    return (
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
