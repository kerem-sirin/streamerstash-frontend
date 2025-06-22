import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // --- Public Routes ---
            { index: true, element: <HomePage /> },
            { path: 'browse', element: <BrowsePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'products/:id', element: <ProductDetailPage /> },
            { path: 'checkout/:orderId', element: <CheckoutPage /> },
            { path: 'order-confirmation', element: <OrderConfirmationPage /> },
            { path: 'cart', element: <CartPage /> },

            // --- Protected Routes ---
            {
                path: 'dashboard',
                element: <ProtectedRoute />, // 3. Use ProtectedRoute as the parent
                children: [
                    { index: true, element: <DashboardPage /> },
                    // We will add other dashboard pages here later (e.g., 'orders', 'downloads')
                ]
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;