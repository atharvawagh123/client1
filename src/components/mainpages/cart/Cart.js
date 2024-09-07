import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [error, setError] = useState('');
  const email = localStorage.getItem('email');
  const username = localStorage.getItem('name');

  const deleteItem = async (index) => {
    try {
      console.log(email,index)
// Send the index number to the backend along with the email and updated cart
      const res = await axios.post('https://server1-yt76.onrender.com/user/cart/delete', {
        email,
        index,    
      });

      // Update the cart with the response from the backend
      setCart(res.data.cart);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting item.');
    }
  };


  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateGST = () => {
    const total = parseFloat(calculateTotalPrice());
    return (total * 0.18).toFixed(2);
  };

  const downloadCSV = () => {
    const header = 'Title,Product ID,Price,Quantity,Total\n';
    const rows = cart.map(item => {
      const total = item.price * item.quantity;
      return `${item.title || 'No title available'},${item.product_id || 'No product ID available'},${item.price || 'N/A'},${item.quantity || 0},${total.toFixed(2)}\n`;
    }).join('');

    const total = calculateTotalPrice();
    const gst = calculateGST();
    const csvContent = `data:text/csv;charset=utf-8,${header}${rows}Total Price,,${total}\nGST,,${gst}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cart_summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendEmail = async () => {
    try {
      const res = await axios.post('https://server1-yt76.onrender.com/users/send-cart', { email, cart });
      alert(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error sending email.');
    }
  };

  if (!cart || cart.length === 0) {
    return <h2 className="cart-empty">Cart Empty</h2>;
  }

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <h2>cart Summary</h2>
        <p>Email: {email}</p>
        <h3>Total Price: ${calculateTotalPrice()}</h3>
        <h4>GST (18%): ${calculateGST()}</h4>
        <button onClick={downloadCSV} className="cta download-btn">
          <span className="button_top">Download CSV</span>
        </button>
        <button onClick={sendEmail} className="cta send-email-btn">
          <span className="button_top">Send Cart to Email</span>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {cart.map((item, index) => (
        <div className="detail" key={item._id}>
          {item.images && item.images.url ? (
            <img src={item.images.url} alt={item.title} className="item-image" />
          ) : (
            <p>No image available</p>
          )}
          <div className="box-detail">
            <div className="row">
              <h2>{item.title || 'No title available'}</h2>
              <h6>{item.product_id || 'No product ID available'}</h6>
            </div>
            <span>${item.price || 'N/A'}</span>
            <p>{item.description || 'No description available'}</p>
            <p>Quantity: {item.quantity || 0}</p>
            <div className='button-section'>
              <button onClick={() => deleteItem(index)} className="cta delete-btn">
                <span className="button_top">Delete</span>
              </button>
              <Link to={`/detail/${item._id}`} className="cta detail-btn">
                <span className="button_top">Details</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
