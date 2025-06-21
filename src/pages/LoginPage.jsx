import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const res = await api.post('/auth/login', { email, password });
            console.log('Login successful:', res.data);
            // NOTE: In the next phase, we'll save the token to context/localStorage here
            alert('Login successful! Redirecting to home...'); // Temporary success message
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Login failed. Please try again.';
            setError(errorMsg);
            console.error(err.response?.data);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">Login to Your Account</h2>
            <form onSubmit={onSubmit} className="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <p className="bg-red-500 text-white text-center p-2 rounded mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600"
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="******************"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;