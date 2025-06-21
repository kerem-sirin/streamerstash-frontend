import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch the 4 latest products to feature on the homepage
                const res = await api.get('/products?limit=4');
                setProducts(res.data.items);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white">The Ultimate Creator Marketplace</h1>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Find the perfect assets to elevate your stream.</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Newest Additions</h2>
                {loading ? (
                    <p className="text-center dark:text-white">Loading products...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;