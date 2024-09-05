import React from 'react';
import Product from './products/Product';
import Login from './login/Login';
import Register from './login/Register';
import Cart from './cart/Cart';
import { Route, Routes } from 'react-router-dom';
import DetailProduct from './utils/DetailProducts/DetailProduct';
import EditProduct from './utils/DetailProducts/EditProduct';
import CreateProduct from './CreateProduct';
import Category from './Category';
import Search from './Search';
import CheckoutForm from './utils/DetailProducts/CheckoutForm';
import OrderList from './utils/DetailProducts/OrderList';
const Pages = () => {
  return (
    <> 
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/detail/:id' element={<DetailProduct />} />
        <Route path='/detail/:id/detail/:id' element={<DetailProduct />} />
        <Route path='/edit_product/:id' element={<EditProduct />} />
        <Route path='/create_product' element={<CreateProduct />} />
        <Route path='/category' element={<Category />} />
        <Route path='/search' element={<Search />} />
        <Route path='/checkout/:id' element={<CheckoutForm />} />
        <Route path='/order' element={<OrderList/>}/>
      </Routes>
    </>
  );
}

export default Pages;
