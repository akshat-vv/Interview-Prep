import React from "react";

const ProductCard = ({ product, handleAddToCart }) => {
  const { images, title, price } = product;
  return (
    <div className="product-card">
      <div className="img-container">
        <img src={images[0]} loading="lazy" />
      </div>

      <p>{title}</p>
      <p>
        <b>{price}</b>
      </p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
