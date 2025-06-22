import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white dark:bg-dark-secondary p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">User Dashboard</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                Welcome back, <span className="font-semibold text-primary">{user?.email}</span>!
            </p>
            <p className="mt-4 dark:text-gray-400">
                This is your personal dashboard. Your order history and purchased assets will be displayed here in the future.
            </p>
        </div>
    );
};

export default DashboardPage;