import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './CheckoutForm.css';

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        address: '',
        city: '',
        zipCode: '',
        country: ''
    });
    const { id: product_id } = useParams(); // Extract product_id from URL
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Load user information from localStorage
        setFormData(prevData => ({
            ...prevData,
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || ''
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post to send-email endpoint
            await axios.post('/users/send-email', {
                ...formData,
                product_id
            });

            // Post to send-database endpoint
            await axios.post('/users/send-database', {
                email: formData.email,
                product_id
            });

            alert('Your order has been placed successfully!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error placing order:', error.response ? error.response.data : error.message);
            alert('There was an error placing your order. Please try again.');
        }
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Shipping Information</h3>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Your Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
            />
            <button type="submit">Place Order</button>
        </form>
    );
};

export default CheckoutForm;
