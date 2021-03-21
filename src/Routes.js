import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'

import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'

import AdminDashBoard from './user/AdminDashBoard'
import UserDashBoard from './user/UserDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import { ToastContainer } from 'react-toastify'
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';



const Routes = () => {
  return (
    <>
      <ToastContainer  />
      <BrowserRouter>
      <Switch>
          <Route exact component={Home} path="/"/>
          <Route exact component={Signup} path="/signup"/>
          <Route exact component={Signin} path="/signin"/>
          <Route exact component={Cart} path="/cart"/>
          <PrivateRoute exact component={UserDashBoard} path="/user/dashboard" />
          <AdminRoute component={AdminDashBoard} path="/admin/dashboard" exact />
          <AdminRoute component={AddCategory} path="/admin/create/category" exact />
          <AdminRoute component={ManageCategories} path="/admin/categories" exact />
          <AdminRoute component={AddProduct} path="/admin/create/product" exact />
          <AdminRoute component={ManageProducts} path="/admin/products" exact />
          <AdminRoute component={UpdateProduct} path="/admin/update/product/:productId" exact />
          <AdminRoute component={UpdateCategory} path="/admin/update/category/:categoryId" exact />
      </Switch>
      </BrowserRouter>
      </>
    )
}

export default Routes;
