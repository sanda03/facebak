import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound, Signin, Signup, Home } from './pages';
import PrivateRoute from './utils/PrivateRoute';
import OnlyPublic from './utils/OnlyPublic';
import Profile from './pages/profile/Profile';

function Router() {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            }/>
            <Route path='/profile' element={
                <PrivateRoute>
                    <Profile/>
                </PrivateRoute>
            }/>
            <Route path='/signup' element={
                <OnlyPublic>
                    <Signup />
                </OnlyPublic>
            }/>
            <Route path='/signin' element={
                <OnlyPublic>
                    <Signin/>
                </OnlyPublic>
            }/>
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Router;