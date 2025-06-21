import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the hook

const Navbar = () => {
    const { user, logout } = useAuth(); // Get user and logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white dark:bg-dark-primary shadow">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    StreamerStash
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary">Home</Link>
                    <Link to="/browse" className="text-gray-600 dark:text-gray-300 hover:text-primary">Browse</Link>

                    {user ? (
                        <>
                            <span className="text-gray-800 dark:text-gray-200">Welcome, {user.email}!</span>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-primary hover:bg-primary-focus text-white px-4 py-2 rounded-md font-semibold">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;