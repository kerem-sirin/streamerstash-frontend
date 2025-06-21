import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';
import DropdownFilter from '../components/DropdownFilter';
import CheckboxFilter from '../components/CheckboxFilter';
import { categoryOptions, tagOptions, sortOptions, initialFilters } from '../constants/filters';

const BrowsePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterInputs, setFilterInputs] = useState(initialFilters);
    const [appliedFilters, setAppliedFilters] = useState(initialFilters);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (appliedFilters.category) params.append('category', appliedFilters.category);
                if (appliedFilters.tags.length > 0) {
                    appliedFilters.tags.forEach(tag => params.append('tag', tag));
                }
                params.append('minPrice', appliedFilters.minPrice);
                params.append('maxPrice', appliedFilters.maxPrice);

                // Parse sortBy to send correct params to backend
                const [sortField, sortOrder] = appliedFilters.sortBy.split('-');
                params.append('sortBy', sortField);
                params.append('order', sortOrder);

                const res = await api.get(`/products?${params.toString()}`);
                setProducts(res.data.items);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [appliedFilters]);

    const handleInputChange = (e) => {
        setFilterInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTagChange = (e) => {
        const { name, checked } = e.target;
        setFilterInputs(prev => {
            const currentTags = prev.tags;
            if (checked) {
                return { ...prev, tags: [...currentTags, name] };
            } else {
                return { ...prev, tags: currentTags.filter(tag => tag !== name) };
            }
        });
    };

    const handlePriceChange = (e) => {
        let { name, value } = e.target;
        const min = parseInt(filterInputs.minPrice);
        const max = parseInt(filterInputs.maxPrice);
        if (name === 'minPrice' && parseInt(value) > max) value = max;
        if (name === 'maxPrice' && parseInt(value) < min) value = min;
        setFilterInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyFilters = (e) => {
        e.preventDefault();
        setAppliedFilters(filterInputs);
    };

    const handleResetFilters = () => {
        setFilterInputs(initialFilters);
        setAppliedFilters(initialFilters);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4">
                <form onSubmit={handleApplyFilters} className="bg-white dark:bg-dark-secondary p-4 rounded-lg shadow-md sticky top-8">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Filters</h3>

                    <DropdownFilter
                        label="Sort By"
                        name="sortBy"
                        options={sortOptions}
                        value={filterInputs.sortBy}
                        onChange={handleInputChange}
                    />

                    <DropdownFilter
                        label="Category"
                        name="category"
                        options={categoryOptions}
                        value={filterInputs.category}
                        onChange={handleInputChange}
                    />

                    <Slider
                        label="Price Range"
                        min="0"
                        max="9900"
                        step="100"
                        minValue={filterInputs.minPrice}
                        maxValue={filterInputs.maxPrice}
                        onValueChange={handlePriceChange}
                    />

                    <CheckboxFilter
                        label="Tags"
                        options={tagOptions}
                        selectedOptions={filterInputs.tags}
                        onChange={handleTagChange}
                    />

                    <div className="flex flex-col gap-2 mt-4">
                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-focus">
                            Apply Filters
                        </button>
                        <button type="button" onClick={handleResetFilters} className="w-full bg-gray-200 dark:bg-slate-600 text-slate-800 dark:text-white font-bold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-slate-500">
                            Reset
                        </button>
                    </div>
                </form>
            </aside>
            <main className="w-full md:w-3/4">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Browse All Products</h1>
                {loading ? <p className="text-center dark:text-white">Loading products...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length > 0 ? products.map(product => <ProductCard key={product.id} product={product} />) : <p className="dark:text-white col-span-full">No products found with the selected filters.</p>}
                    </div>
                )}
            </main>
        </div>
    );
};

export default BrowsePage;