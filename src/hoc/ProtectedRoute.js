// этот компонент принимает другой компонент в качестве пропса
import React, { useContext }  from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...props  }) => {
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace/>
    )}

export default ProtectedRoute;
