import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react';
export const UserContext = createContext();


function getDefaultValue(){
    if(Cookies.get('token') && Cookies.get('user')){
        return JSON.parse(Cookies.get('user'));
    }
    return null;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getDefaultValue());
    
    const login = (newUser, token) => {
        setUser({ ...user, ...newUser });
        Cookies.set('user', JSON.stringify({ ...user, ...newUser }));
        Cookies.set('token', token);
    };
    const isConnected = () => user !== null;
    
    const getId = ()=>{
        if(isConnected()){
            return user.id;
        }
        return null;
    }

    const logout = () => {
        setUser(null);
        Cookies.set('user', '');
        Cookies.set('token', '');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isConnected,getId }}>
            {children}
        </UserContext.Provider>
    );
}
