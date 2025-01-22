import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { LuShoppingCart } from "react-icons/lu";


const ProductCard = ({ product, addToCart, handleQuantityChange, cartProduct }) => {
  return (
    <div className="product-card">
      {/* Brand name at the upper left */}
      <div className="brand-name">{product.brand}</div>

      {/* Image and product details */}
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.images[0]} alt={product.name} className="product-image"  />
        <h3 className="product-name">{product.name}</h3>
      </Link>

      {/* Price and Rating Section */}
      <div className="product-info">
        {/* Price on the left */}
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        {/* Rating on the right */}
        <div className="product-rating">
          <span className="rating-stars">{'★'.repeat(product.rating)}</span>
        </div>
      </div>

      {/* Cart quantity control or Add to Cart button */}
      {cartProduct ? (
  <div className="quantity-control d-flex align-items-center">
    <div
      className="quantity-container d-flex align-items-center justify-content-between border rounded "
      style={{
        backgroundColor: "#f8f9fa",
        padding: "5px 10px",
        minWidth: "100px",
      }}
    >
      <button
        className="decrease-btn btn btn-sm btn-light "
        onClick={() => handleQuantityChange(product, "decrease")}
        style={{
          border: "none",
          backgroundColor: "transparent",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        -
      </button>
      <span
        className="quantity"
        style={{
          margin: "0 10px",
          fontWeight: "bold",
        }}
      >
        {cartProduct.quantity}
      </span>
      <button
        className="increase-btn btn btn-sm btn-light"
        onClick={() => handleQuantityChange(product, "increase")}
        style={{
          border: "none",
          backgroundColor: "transparent",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        +
      </button>
    </div>
    <button
      className="remove-from-cart-btn btn btn-sm btn-danger ms-2"
      onClick={() => handleQuantityChange(product, "remove")}
    >
      Remove
    </button>
  </div>
) : (
  <button
    className="add-to-cart-btn btn btn-primary w-100"
    onClick={() => addToCart(product)}
  >
  <LuShoppingCart style={{marginTop:'-2px'}}/>&nbsp;
  Add to Cart
  </button>
)}

    </div>
  );
};

export default ProductCard;
