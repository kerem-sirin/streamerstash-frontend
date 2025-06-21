import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark-primary shadow-inner mt-auto">
            <div className="container mx-auto px-4 py-6 flex justify-center items-center text-gray-600 dark:text-gray-400">
                <div className="flex space-x-6">
                    <Link to="/about" className="hover:text-primary">About</Link>
                    <Link to="/contact" className="hover:text-primary">Contact</Link>
                    <p>&copy; {new Date().getFullYear()} StreamerStash. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;