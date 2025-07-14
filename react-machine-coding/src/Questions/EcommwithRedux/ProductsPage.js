
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import  {addItem, removeItem} from './store/cartSlice';
const ProductsPage = () => {
  const [data, setData] = useState([]);

  const cartItems = useSelector((state)=>state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await fetch("https://dummyjson.com/products");
        const data = await reponse.json();
        setData(data.products);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-container">
      {data.map((product) => {
        return (
          <ProductCard product={product} handleAddToCart={handleAddToCart} />
        );
      })}
    </div>
  );
};

export default ProductsPage;
