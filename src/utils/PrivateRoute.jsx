import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/useAuth';

function PrivateRoute({children}) {
    const userConnection = useContext(UserContext);

    return (
        <>
            {!userConnection.isConnected() ? <Navigate to={'/signin'}/> : children}
        </>
    );
}

export default PrivateRoute;