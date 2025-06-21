import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Format the price from cents to a currency string
    const formattedPrice = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(product.price / 100);

    return (
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <Link to={`/products/${product.id}`}>
                <img
                    // Using a placeholder image for now. We will replace this with real preview images later.
                    src={`https://placehold.co/600x400/7C3AED/FFFFFF?text=${product.name.replace(/\s/g, '+')}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-primary">{formattedPrice}</span>
                        <button className="bg-primary text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-focus">
                            View
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;