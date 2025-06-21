import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from our context

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/'); // Navigate home on successful login
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    // The return JSX for the form
    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">Login to Your Account</h2>
            <form onSubmit={onSubmit} className="bg-white dark:bg-dark-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <p className="bg-red-500 text-white text-center p-2 rounded mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600" id="email" type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600" id="password" type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-primary hover:bg-primary-focus text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
                    <a className="inline-block align-baseline font-bold text-sm text-primary hover:underline" href="#">Forgot Password?</a>
                </div>
            </form>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Don't have an account? <Link to="/register" className="font-bold text-primary hover:underline">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;