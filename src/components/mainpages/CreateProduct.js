import React, { useState } from 'react';
import axios from 'axios';
import './CreateProduct.css';

const CreateProduct = () => {
    const [product, setProduct] = useState({
        product_id: '',
        title: '',
        price: '',
        description: '',
        content: '',
        images: {
            public_id: '',
            url: '',
        },
        category: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input change for product details
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Handle input change for image details
    const handleImageChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: {
                ...prevProduct.images,
                [name]: value,
            },
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('https://server1-yt76.onrender.com/api/products', product);
            setMessage('Product created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error.response || error.message);
            setMessage('Error creating product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='create-product-container'>
            <h2 className='create-product-title'>Create Product</h2>
            {message && <p className='create-product-message'>{message}</p>}
            {loading && <p className='create-product-loading'>Loading...</p>}
            <form onSubmit={handleSubmit} className='create-product-form'>
                <label htmlFor='product_id' className='create-product-label'>
                    Product ID:
                    <input
                        id='product_id'
                        type='text'
                        name='product_id'
                        value={product.product_id}
                        onChange={handleProductChange}
                        required
                        className='create-product-input'
                    />
                </label>
                <label htmlFor='title' className='create-product-label'>
                    Title:
                    <input
                        id='title'
                        type='text'
                        name='title'
                        value={product.title}
                        onChange={handleProductChange}
                        required
                        className='create-product-input'
                    />
                </label>
                <label htmlFor='price' className='create-product-label'>
                    Price:
                    <input
                        id='price'
                        type='number'
                        step='0.01'
                        name='price'
                        value={product.price}
                        onChange={handleProductChange}
                        required
                        className='create-product-input'
                    />
                </label>
                <label htmlFor='description' className='create-product-label'>
                    Description:
                    <textarea
                        id='description'
                        name='description'
                        value={product.description}
                        onChange={handleProductChange}
                        required
                        className='create-product-textarea'
                    />
                </label>
                <label htmlFor='content' className='create-product-label'>
                    Content:
                    <textarea
                        id='content'
                        name='content'
                        value={product.content}
                        onChange={handleProductChange}
                        required
                        className='create-product-textarea'
                    />
                </label>
                <label htmlFor='images-public_id' className='create-product-label'>
                    Image Public ID:
                    <input
                        id='images-public_id'
                        type='text'
                        name='public_id'
                        value={product.images.public_id}
                        onChange={handleImageChange}
                        required
                        className='create-product-input'
                    />
                </label>
                <label htmlFor='images-url' className='create-product-label'>
                    Image URL:
                    <input
                        id='images-url'
                        type='text'
                        name='url'
                        value={product.images.url}
                        onChange={handleImageChange}
                        required
                        className='create-product-input'
                    />
                </label>
                <label htmlFor='category' className='create-product-label'>
                    Category:
                    <input
                        id='category'
                        type='text'
                        name='category'
                        value={product.category}
                        onChange={handleProductChange}
                        required
                        className='create-product-input'
                    />
                </label>
                <button type='submit' className='create-product-submit-button' disabled={loading}>
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
