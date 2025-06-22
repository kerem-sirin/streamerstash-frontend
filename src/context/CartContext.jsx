import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // We need the user to fetch their cart

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            if (user) {
                try {
                    const res = await api.get('/cart');
                    setCart(res.data);
                } catch (err) {
                    console.error("Failed to fetch cart:", err);
                    setCart(null); // Reset cart on error
                }
            } else {
                // If there's no user, there's no cart
                setCart(null);
            }
            setLoading(false);
        };

        fetchCart();
    }, [user]); // Re-fetch the cart whenever the user changes (login/logout)

    const addItemToCart = async (productId) => {
        try {
            const res = await api.post('/cart/items', { productId });
            setCart(res.data);
        } catch (err) {
            console.error("Failed to add item:", err);
            // We could add user-facing error messages here
        }
    };

    const removeItemFromCart = async (productId) => {
        try {
            const res = await api.delete(`/cart/items/${productId}`);
            setCart(res.data);
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    const clearCart = () => {
        setCart(null);
    }

    const cartContextValue = {
        cart,
        loading,
        addItemToCart,
        removeItemFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to easily use the cart context
export const useCart = () => {
    return useContext(CartContext);
};