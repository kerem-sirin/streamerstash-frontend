import React from 'react';

const ContactPage = () => {
    return (
        <div className="bg-white dark:bg-dark-secondary p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Contact Us</h1>
            <p className="text-gray-700 dark:text-gray-300">
                Have questions or need support? Reach out to us at <a href="mailto:info@bluebuck.games" className="text-primary hover:underline">info@bluebuck.games</a>
            </p>
        </div>
    );
};

export default ContactPage;