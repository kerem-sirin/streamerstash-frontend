import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        // While we are checking for the user, show a loading message
        // This prevents a flicker effect where the user is briefly redirected
        return <div className="text-center dark:text-white p-10">Loading...</div>;
    }

    // If loading is finished and there is no user, redirect to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If a user exists, render the child route content
    return <Outlet />;
};

export default ProtectedRoute;