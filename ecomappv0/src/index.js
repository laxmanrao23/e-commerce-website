// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome
// npm i -D react-router-dom
//npm install --save-dev @fortawesome/fontawesome-free


import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// import ClassComponent from './components/ClassComponent';
// import AddUpdateDelete from './components/AddUpdateDelete';

import reportWebVitals from './reportWebVitals';
import AddProduct from './components/AddProduct';
import Search from './components/Search';
import Layout from "./components/Layout";
import Cart from "./components/Cart";
import ProductDescription from "./components/ProductDescription";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Signup from "./components/Signup";
import Report from "./components/Report";
import EditProduct from "./components/EditProduct";
import Ordpage from "./components/Ordpage";

import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavScrollExample from "./components/NavScrollExample";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="product" element={<Product />} />
          <Route path="add_product" element={<AddProduct />} />
          <Route path="edit_product" element={<EditProduct />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="report" element={<Report />} />
          <Route path="Ordpage" element={<Ordpage />} />
          <Route path="product_description" element={<ProductDescription />} />
          <Route path="" element={<Welcome />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();