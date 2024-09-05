import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Search.css';

import { BsSearchHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const Search = () => {
    const state = useContext(GlobalState);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [priceRange, setPriceRange] = useState('');
    const addCart = state.userAPI.addCart;

    useEffect(() => {
        if (search) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [search]);

    useEffect(() => {
        if (search) {
            fetchProducts();
        }
    }, [search, priceRange]);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`/api/products/suggestions?title=${search}`);
            setSuggestions(response.data.products);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/products?title=${search}&price[lte]=${priceRange}`);
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="search-main-container">
            <div className="search-input-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <BsSearchHeartFill onClick={fetchProducts} />
                <select
                    className="price-range-select"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                >
                    <option value="">All Prices</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                </select>
            </div>

            {search && suggestions.length > 0 && (
                <div className="suggestions-container">
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                            <li key={suggestion._id} className="suggestion-item">
                                <img src={suggestion.images.url} alt='Suggestion' className='suggestion-image' />
                                <div className='suggestion-details'>
                                    <h2 className='suggestion-title' title={suggestion.title}>{suggestion.title}</h2>
                                    <span className='suggestion-price'>${suggestion.price}</span>
                                    <Link className='btn' to={`/detail/${suggestion._id}`}>
                                        View
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ul className="product-list">
                {products.map((product) => (
                    <li key={product._id} className="product-item">
                        <img src={product.images.url} alt='Product' className='product-image' />
                        <div className='product-details'>
                            <h2 className='product-title' title={product.title}>{product.title}</h2>
                            <span className='product-price'>${product.price}</span>
                            <p className='product-description'>{product.description}</p>
                        </div>
                        <div className='product-actions'>
                            <Link className='btn' to={`#!`} onClick={() => addCart(product)}>
                                Buy
                            </Link>
                            <Link className='btn' to={`/detail/${product._id}`}>
                                View
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
