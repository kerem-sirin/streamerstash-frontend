import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const CartPage = () => {
    const { cart, removeItemFromCart, clearCart } = useCart();
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (cart && cart.items && cart.items.length > 0) {
                try {
                    // We can't use BatchGetCommand from the client, so we'll fetch one by one.
                    // A dedicated backend endpoint could optimize this in the future.
                    const productPromises = cart.items.map(productId =>
                        api.get(`/products/${productId}`)
                    );
                    const productResponses = await Promise.all(productPromises);
                    setCartProducts(productResponses.map(res => res.data));
                } catch (err) {
                    console.error("Error fetching product details for cart", err);
                }
            } else {
                setCartProducts([]);
            }
            setLoading(false);
        };

        fetchProductDetails();
    }, [cart]);

    const handleProceedToCheckout = async () => {
        try {
            // Create the order first
            const res = await api.post('/orders');
            const newOrder = res.data;

            clearCart(); // Clear the cart context

            // Navigate to the checkout page with the orderId in the URL
            navigate(`/checkout/${newOrder.id}`, {
                // We still pass totalAmount in state for display purposes
                state: {
                    totalAmount: newOrder.totalAmount
                }
            });
        } catch (err) {
            console.error("Error creating order:", err);
            alert('Failed to create order. Please try again.');
        }
    };

    const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

    if (loading) return <p className="text-center dark:text-white">Loading cart...</p>;

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Shopping Cart</h1>
            {cartProducts.length === 0 ? (
                <p className="dark:text-gray-300">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3">
                        {cartProducts.map(product => (
                            <div key={product.id} className="flex items-center bg-white dark:bg-dark-secondary p-4 rounded-lg shadow mb-4">
                                <img src={`https://placehold.co/150x100/7C3AED/FFFFFF?text=${product.name.replace(/\s/g, '+')}`} alt={product.name} className="w-24 h-16 object-cover rounded-md mr-4" />
                                <div className="flex-grow">
                                    <h3 className="font-bold dark:text-white">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-primary">£{(product.price / 100).toFixed(2)}</p>
                                    <button onClick={() => removeItemFromCart(product.id)} className="text-red-500 hover:text-red-700 text-sm mt-1">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 dark:text-white">Cart Summary</h2>
                            <div className="flex justify-between mb-2 dark:text-gray-300">
                                <span>Subtotal</span>
                                <span>£{(total / 100).toFixed(2)}</span>
                            </div>
                            <hr className="my-4 dark:border-gray-600" />
                            <div className="flex justify-between font-bold text-lg dark:text-white">
                                <span>Total</span>
                                <span>£{(total / 100).toFixed(2)}</span>
                            </div>
                            <button onClick={handleProceedToCheckout} className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-3 px-4 rounded-lg mt-6">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;