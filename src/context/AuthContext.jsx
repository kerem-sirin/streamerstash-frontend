import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { jwtDecode } from 'jwt-decode'; // We need to install this library

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // Verify token is not expired
                    const decodedToken = jwtDecode(token);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        logout(); // Token expired
                    } else {
                        // Set the auth header for all subsequent API requests
                        api.defaults.headers.common['x-auth-token'] = token;
                        // Fetch user data
                        const res = await api.get('/auth/me');
                        setUser(res.data);
                    }
                } catch (error) {
                    console.error('Error loading user:', error);
                    logout(); // Invalid token
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        // The useEffect will automatically load the user data
    };

    const register = async (email, password) => {
        await api.post('/auth/register', { email, password });
        // After registration, user still needs to log in.
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['x-auth-token'];
    };

    const authContextValue = {
        user,
        token,
        loading,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};