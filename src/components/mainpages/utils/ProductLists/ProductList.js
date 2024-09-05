import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import BtnRender from './BtnRender'

const ProductList = ({ product, isAdmin }) => {
  return (
    <div className='product-item'>
      {
        isAdmin && <input type='checkbox' checked={product.checked} className='product-checkbox' />
      }
      <img src={product.images.url} alt='Product' className='product-image' />

      <div className='product-details'>
        <h2 className='product-title' title={product.title}>{product.title}</h2>
        <span className='product-price'>${product.price}</span>
        <p className='product-description'>{product.description}</p>
      </div>

      <BtnRender product={product} className='product-actions' />
    </div>
  )
}

export default ProductList
