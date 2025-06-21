import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true, // This makes HomePage the default child route for '/'
                element: <HomePage />,
            },
            {
                path: 'browse',
                element: <BrowsePage />,
            },
            // We will add login, register, and other pages here later
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;