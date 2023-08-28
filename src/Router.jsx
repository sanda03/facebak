import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound, Signin, Signup, Home } from './pages';
import PrivateRoute from './utils/PrivateRoute';

function Router() {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            }/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Router;