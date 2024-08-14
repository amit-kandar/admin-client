import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

export const UserProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check localStorage on mount
        const loggedIn = localStorage.getItem('login') === 'true';
        setIsLogin(loggedIn);
        setUsername(localStorage.getItem('username') || '');
    }, []);

    const login = (username, success) => {
        setIsLogin(success);
        setUsername(username);
        localStorage.setItem('login', success);
        localStorage.setItem('username', username);
    };

    const logout = () => {
        setIsLogin(false);
        setUsername('');
        localStorage.removeItem('login');
        localStorage.removeItem('username');
    };

    return (
        <UserContext.Provider value={{ isLogin, username, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};