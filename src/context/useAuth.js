import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react';
export const UserContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(Cookies.get('token') && (JSON.parse(Cookies.get('user')) || null));
    
    const login = (newUser, token) => {
        setUser({ ...user, ...newUser });
        Cookies.set('user', JSON.stringify({ ...user, ...newUser }));
        Cookies.set('token', token);
    };

    const isConnected = () => user !== null;

    const logout = () => {
        setUser(null);
        Cookies.set('user', '');
        Cookies.set('token', '');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isConnected }}>
            {children}
        </UserContext.Provider>
    );
}
