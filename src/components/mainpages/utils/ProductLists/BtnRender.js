import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BtnRender.css';

const BtnRender = ({ product }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const [products, setProducts] = state.productsAPI.products;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/${product._id}`);
        setProducts(products.filter(prod => prod._id !== product._id));
        alert('Product deleted successfully.');
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  return (
    <div className='btn-container'>
      {isAdmin ? (
        <>
          <a className='btn-delete' onClick={handleDelete}>
            Delete
          </a>
          <Link className='btn' to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link className='btn' to={`#!`} onClick={() => addCart(product)}>
           ADD
          </Link>
          <Link className='btn' to={`detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
