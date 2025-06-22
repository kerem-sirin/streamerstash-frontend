import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import api from '../utils/api';

// Load your publishable key from the .env file
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState('');
    const { orderId } = useParams(); // Get the stable orderId from URL params
    const location = useLocation();
    const { totalAmount } = location.state || {}; // Get display data from location state

    useEffect(() => {
        if (orderId) {
            api.post('/payments/create-intent', { orderId })
                .then((res) => setClientSecret(res.data.clientSecret))
                .catch(err => console.error("Error creating payment intent", err));
        }
    }, [orderId]); // Effect depends on the stable orderId from the URL

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const formattedTotal = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(totalAmount / 100);

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Complete Your Purchase</h1>
            <div className="bg-white dark:bg-dark-secondary p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 text-lg">
                    <span className="font-medium dark:text-gray-300">Order Total:</span>
                    <span className="font-bold text-primary">{formattedTotal}</span>
                </div>
                {clientSecret && (
                    <Elements key={clientSecret} options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
