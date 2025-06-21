import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-800 shadow mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} StreamerStash. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;