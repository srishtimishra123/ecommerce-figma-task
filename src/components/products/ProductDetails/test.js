import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { addToCart, removeFromCart, updateQuantity } from '../../../redux/cartSlice';
import Carousel from '../Carousel/Carousel'; // Import a Carousel component

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === parseInt(id))
  );
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0]);

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        color: selectedColor,
        storage: selectedStorage,
      })
    );
  };

  const handleQuantityChange = (changeType) => {
    if (changeType === 'increase') {
      dispatch(updateQuantity({ productId: product.id, quantityChange: 1 }));
    } else if (changeType === 'decrease') {
      dispatch(updateQuantity({ productId: product.id, quantityChange: -1 }));
    }
  };

  return (
    <div className="container my-5 product-details-page">
      <div className="row">
        {/* Left Section: Images */}
        <div className="col-md-6">
          <Carousel images={product.images} />
        </div>

        {/* Right Section: Product Info */}
        <div className="col-md-6">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">
            {product.discountPrice && (
              <span className="discounted-price">${product.discountPrice}</span>
            )}
            <span className={product.discountPrice ? 'original-price' : ''}>
              ${product.price}
            </span>
          </p>
          <div className="product-variants">
            {/* Color Selection */}
            <h4>Colors</h4>
            <ul className="list-inline">
              {product.colors.map((color, index) => (
                <li
                  key={index}
                  className={`list-inline-item ${
                    selectedColor === color ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </li>
              ))}
            </ul>

            {/* Storage Selection */}
            <h4>Storage</h4>
            <ul className="list-inline">
              {product.storage.map((storage, index) => (
                <li
                  key={index}
                  className={`list-inline-item ${
                    selectedStorage === storage ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart or Update Quantity */}
          <div className="cart-actions">
            {cartItem ? (
              <div className="quantity-control">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleQuantityChange('decrease')}
                >
                  -
                </button>
                <span className="quantity">{cartItem.quantity}</span>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleQuantityChange('increase')}
                >
                  +
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mt-5">
        <h3>Specifications</h3>
        <table className="table table-striped">
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <h3>Reviews</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review p-3 border rounded mb-3">
              <strong>{review.user}</strong> - {review.rating}★
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
