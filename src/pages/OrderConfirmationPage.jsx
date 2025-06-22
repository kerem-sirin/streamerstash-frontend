import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
            <p className="dark:text-white">Thank you for your purchase.</p>
            <p className="dark:text-gray-400 mt-2">Your Order ID is: {orderId}</p>
            <Link to="/dashboard/downloads" className="inline-block mt-6 bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-focus">
                Go to My Downloads
            </Link>
        </div>
    );
};
export default OrderConfirmationPage;