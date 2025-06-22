import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // 1. Import useCart

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart(); // 2. Get cart data
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemCount = cart?.items?.length || 0;

    return (
        <header className="bg-white dark:bg-dark-primary shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">StreamerStash</Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary">Home</Link>
                    <Link to="/browse" className="text-gray-600 dark:text-gray-300 hover:text-primary">Browse</Link>

                    <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {user && cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
                        )}
                    </Link>

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
