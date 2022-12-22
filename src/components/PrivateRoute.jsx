import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loading from './Loading';

const PrivateRoute = () => {
    const { firebaseAuth: { loading, user } } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />
    }

    return user.email ? <Outlet /> : <Navigate to="/signup" state={{ from: location }} />
}

export default PrivateRoute;