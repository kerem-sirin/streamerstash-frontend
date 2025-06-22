import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { user } = useAuth();
    const { addItemToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError('Product not found.');
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Re-run the effect if the ID in the URL changes

    const handleAddToCart = () => {
        if (!user) {
            // If user is not logged in, redirect them to the login page
            navigate('/login');
            return;
        }
        addItemToCart(product.id);
        alert(`${product.name} has been added to your cart!`);
    };

    if (loading) {
        return <div className="text-center dark:text-white p-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-10">{error}</div>;
    }

    if (!product) {
        return null; // Or show a more comprehensive "not found" component
    }

    // Format the price from cents to a displayable currency string
    const formattedPrice = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(product.price / 100);

    // NOTE: In a real application, this base URL would come from a .env file
    const S3_BASE_URL = 'https://streamerstash-assets-eu-west-2.s3.amazonaws.com';

    return (
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image Carousel Section */}
                <div className="w-full md:w-1/2">
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        <img
                            // For now, we'll just show the first preview image or a placeholder
                            src={product.previewImageKeys?.length > 0 ? `${S3_BASE_URL}/${product.previewImageKeys[0]}` : `https://placehold.co/800x600/7C3AED/FFFFFF?text=${product.name.replace(/\s/g, '+')}`}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    </div>
                    {/* Placeholder for thumbnail gallery */}
                    <div className="grid grid-cols-5 gap-2">
                        {/* You can map over product.previewImageKeys here to create thumbnails */}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">{product.name}</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                        Sold by <span className="text-primary font-semibold">Artist Name</span> {/* NOTE: We'll fetch artist name later */}
                    </p>
                    <p className="text-3xl font-bold text-primary mt-6">{formattedPrice}</p>

                    <div className="mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-lg"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold dark:text-white mb-2">Description</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold dark:text-white mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.tags && product.tags.map(tag => (
                                <span key={tag} className="bg-secondary dark:bg-slate-700 text-primary dark:text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;