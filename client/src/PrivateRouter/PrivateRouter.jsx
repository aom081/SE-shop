import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const {user} = useContext(AuthContext);
    const location =useLocation();
    if (user) {
        return children;
    }
    return <Navigate to ="/SignIn" state={{from:location}} replace />
}

export default PrivateRouter
