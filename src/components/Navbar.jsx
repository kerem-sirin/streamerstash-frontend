import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="bg-white dark:bg-slate-800 shadow">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    StreamerStash
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                    <Link to="/browse" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Browse</Link>
                    <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;