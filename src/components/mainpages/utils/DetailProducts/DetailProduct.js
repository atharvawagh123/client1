import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'; // Import delete icon
import { IoIosSend } from 'react-icons/io'; // Import send icon
import { CgProfile } from "react-icons/cg";
import './detailProduct.css'; // Import your CSS file

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState(null);
  const [isAdmin] = state.userAPI.isAdmin;
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const addCart = state.userAPI.addCart;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const username = localStorage.getItem('name'); // Assuming the username is stored in local storage

  useEffect(() => {
    if (params && products.length > 0) {
      const product = products.find(product => product._id === params.id);
      if (product) {
        setDetailProduct(product);

        const filteredProducts = products.filter(product => product._id !== params.id);
        setSuggestedProducts(filteredProducts.slice(0, 4));

        fetchComments(params.id);
      } else {
        console.error('Product not found');
      }
    }
  }, [params, products]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`https://server1-yt76.onrender.com/api/products/${params.id}`);
      // Redirect or update the state after deletion
      alert('Product deleted successfully');
      // Redirect or handle state update as needed
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const fetchComments = async (productId) => {
    try {
      const res = await axios.get(`https://server1-yt76.onrender.com/api/products/${productId}/comments`);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!username || !newComment.trim()) {
      return alert('Username and comment are required.');
    }

    try {
      const res = await axios.post(`https://server1-yt76.onrender.com/api/products/${params.id}/comments`, {
        username,
        comment: newComment.trim(),
      });
      setComments(res.data.comments);
      setNewComment('');
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`https://server1-yt76.onrender.com/api/products/${params.id}/comments/${commentId}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (!detailProduct) return <div>Loading...</div>;

  return (
    <div className="detail-product">
      <div className="detail-product-container">
        <div className="detail-image">
          <img src={detailProduct.images.url} alt={detailProduct.title} />
        </div>
        <div className="detail-info">
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>

          <button className="buy-now" onClick={() => addCart(detailProduct)}>
           addCart
          </button>

          {/* Add the Link to the CheckoutForm */}
          <Link to={`/checkout/${detailProduct._id}`} className="buy-now">
            Proceed to Checkout
          </Link>

          {isAdmin && (
            <>
              <Link to={`/edit_product/${detailProduct._id}`} className="edit-product">
                Edit Product
              </Link>
              <button className="delete-product" onClick={deleteProduct}>
                <MdDelete size={20} /> {/* Display delete icon */}
                Delete Product
              </button>
            </>
          )}
        </div>
      </div>

      <div className="suggested-products">
        <h3>Suggested Products</h3>
        <div className="suggested-products-list">
          {suggestedProducts.map(product => (
            <div key={product._id} className="suggested-product-card">
              <img src={product.images.url} alt={product.title} />
              <h4>{product.title}</h4>
              <span>${product.price}</span>
              <Link to={`detail/${product._id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="comment-part">
        <div className="comments-section">
          <h3>Comments</h3>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment._id} className="comment">
                <CgProfile />
                <h4 className='username'>{comment.username}</h4>
                <p className='comment-comments'> {comment.comment}</p>
                {username === comment.username && ( // Only show the delete button if the user is the owner of the comment
                  <button className="delete-comment" onClick={() => deleteComment(comment._id)}>
                    <MdDelete size={20} /> {/* Display delete icon */}
                  </button>
                )}
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={submitComment}>
            <textarea
              placeholder="Your Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit">
              <IoIosSend size={20} /> {/* Display send icon */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
