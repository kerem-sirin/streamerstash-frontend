import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth(); // Get the register function from our context

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(email, password);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            const errorMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || 'Registration failed.';
            setError(errorMsg);
        }
    };

    // The return JSX for the form
    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">Create an Account</h2>
            <form onSubmit={onSubmit} className="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <p className="bg-red-500 text-white text-center p-2 rounded mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600" id="email" type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600" id="password" type="password" name="password" value={password} onChange={onChange} placeholder="Minimum 6 characters" required />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create Account</button>
                </div>
            </form>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Already have an account? <Link to="/login" className="font-bold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;