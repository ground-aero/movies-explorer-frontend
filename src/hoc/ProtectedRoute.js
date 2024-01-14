// этот компонент принимает другой компонент в качестве пропса
import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ component: Component, ...props  }) => {
    let loggedIn = useContext(AuthContext)
    return loggedIn ? <Component {...props} /> : <Navigate to='/' replace/>
    };

export default ProtectedRoute;
