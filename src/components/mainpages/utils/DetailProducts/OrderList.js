// src/components/OrderList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = localStorage.getItem('email'); // Retrieve email from local storage
    console.log(email);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://server1-yt76.onrender.com/orders', {
                    params: { email } // Pass email as a query parameter
                });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [email]); // Use `email` as the dependency

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`/orders/${email}/${orderId}`); // Use `email` for deletion
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (err) {
            setError('Failed to delete order');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Order List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.title}</td>
                            <td>{order.price}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
