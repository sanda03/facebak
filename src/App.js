import React from 'react'
import { BrowserRouter} from 'react-router-dom';
import Router from './Router';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Router />
        </BrowserRouter>
    )
}

export default App;