import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    // Function to get user data
    const getUser = async () => {
        if (token) {
            try {
                const res = await axios.get('https://server1-yt76.onrender.com/user/infor', {
                    headers: { Authorization: token }
                });
                console.log(res.data.name)
                // Extract the email from the response
                const { email } = res.data;
                const { name } = res.data;
                // Store the email in localStorage
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);
                // Set the logged-in status and admin status
                setIsLogged(true);
                setIsAdmin(res.data.role === 1);

                // Fetch the user's cart from the backend
                setCart(res.data.cart || []);

            } catch (err) {
                alert(err.response?.data?.msg || 'Error fetching user data.');
            }
        }
    };

    useEffect(() => {
        getUser(); // Call getUser on initial render or token change
    }, [token]);

    const addCart = async (product) => {
        if (!isLogged) return alert("Please log in first.");

        // Check if the product is already in the cart
        const check = cart.every(item => item._id !== product._id);

        if (check) {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            setCart(updatedCart);

            try {
                // Save the updated cart to the backend
                await axios.patch('/user/addcart', { cart: updatedCart }, {
                    headers: { Authorization: token }
                });
            } catch (err) {
                alert(err.response?.data?.msg || 'Error updating cart.');
            }
        } else {
            alert("This product has already been added to the cart.");
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart,
        getUser
    };
};

export default UserAPI;
