import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { BrowserRouter, Routes, Route } from "react-router";
import "./style.css";
import Navbar from "./Navbar";
import ProductsPage from "./ProductsPage";
import Home from "./Home";
import CartPage from "./CartItem";

const EcommApp = () => {
  return (
    <div class="myApp">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default EcommApp;
