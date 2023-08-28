import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/useAuth';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Router />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
