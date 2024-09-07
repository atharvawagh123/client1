import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import axios from 'axios';
import './EditProduct.css'; // Import the CSS file

const EditProduct = () => {
    const { id } = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        content: '',
        images: {}
    });

    useEffect(() => {
        if (id && products.length > 0) {
            const selectedProduct = products.find(prod => prod._id === id);
            if (selectedProduct) {
                setProduct(selectedProduct);
            }
        }
    }, [id, products]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`https://server1-yt76.onrender.com/api/products/${id}`, product);
            alert('Product updated successfully');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className='edit-product-container'>
            {product.title ? (
                <form className='edit-product-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={product.title}
                            onChange={handleChangeInput}
                            placeholder='Enter product title'
                            className='form-input'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price' className='form-label'>Price</label>
                        <input
                            type='number'
                            id='price'
                            name='price'
                            value={product.price}
                            onChange={handleChangeInput}
                            placeholder='Enter product price'
                            className='form-input'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <textarea
                            id='description'
                            name='description'
                            value={product.description}
                            onChange={handleChangeInput}
                            placeholder='Enter product description'
                            className='form-textarea'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='content' className='form-label'>Content</label>
                        <textarea
                            id='content'
                            name='content'
                            value={product.content}
                            onChange={handleChangeInput}
                            placeholder='Enter product content'
                            className='form-textarea'
                        />
                    </div>
                    <button type='submit' className='submit-button'>Update Product</button>
                </form>
            ) : (
                <p className='loading-text'>Loading product details...</p>
            )}
        </div>
    );
};

export default EditProduct;
