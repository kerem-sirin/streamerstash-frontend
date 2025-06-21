import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage'; // 1. Import
import ContactPage from './pages/ContactPage'; // 1. Import

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'browse', element: <BrowsePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'about', element: <AboutPage /> },     // 2. Add route
            { path: 'contact', element: <ContactPage /> }, // 2. Add route
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;