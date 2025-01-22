import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { addToCart, removeFromCart, updateQuantity } from '../../../redux/cartSlice';
import { FaRegHeart } from "react-icons/fa";


const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );
  const [activeTab, setActiveTab] = useState("specifications"); 
   const cartItem = useSelector((state) =>
      state.cart.items.find((item) => item.id === parseInt(id))
    );
  const dispatch = useDispatch();

  // State for selected color, storage, and displayed image
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);
  const [mainImage, setMainImage] = useState(product.images[0]); // Default to the first image

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
        {/* Product Images Section */}
        <div className="col-lg-6 col-md-6">
  <div className="product-images">
    {/* Main Image */}
    <div className="main-image mb-4 text-center">
      <img
        src={mainImage}
        alt={product.name}
        className="img-fluid border rounded"
      />
    </div>

    {/* Thumbnail Images */}
    <div className="thumbnail-images d-flex justify-content-center flex-wrap">
      {product.images.map((image, index) => (
        <div key={index} className="mx-2">
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`img-thumbnail ${
              image === mainImage ? "border-primary shadow" : ""
            }`}
            style={{
              cursor: "pointer",
              width: "80px",
              height: "80px",
            }}
            onClick={() => setMainImage(image)}
          />
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Product Info Section */}
        <div className="col-lg-6 col-md-6">
          <h1 className="display-4">{product.name}</h1>
          <div className="product-rating mb-2">
            <span>{`★`.repeat(product.rating)}</span>{" "}
            <span>({product.reviews.length} Review)</span>
          </div>
        

          {/* Variants */}
          <div className="product-variants">
            <p>
              <strong>Colors:</strong>
            </p>
            <ul className="list-inline">
              {product.colors.map((color, index) => (
                <li
                  key={index}
                  className={`list-inline-item ${
                    color === selectedColor ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color, cursor: "pointer",width:'30px',height:'30px' }}
                  onClick={() => setSelectedColor(color)}
                ></li>
              ))}
            </ul>
            <p>
              <strong>Storage:</strong>
            </p>
            <div className="d-flex" style={{justifyContent:'start',marginTop:'-10px'}}>
  {product.storage.map((storageOption, index) => (
    <div
      key={index}
      className=""
    >
      <button
        type="button"
        className={`btn btn-outline-primary ${
          storageOption === selectedStorage ? "active" : ""
        }`} style={{margin:'5px'}}
        onClick={() => setSelectedStorage(storageOption)}
      >
        {storageOption} GB
      </button>
    </div>
  ))}
</div>

          </div>
          <p className="product-price mt-3">
            {product.discountPrice && (
              <span className="discounted-price text-danger">
                ₹{product.discountPrice}
              </span>
            )}
            <span
              className={
                product.discountPrice
                  ? "original-price text-muted"
                  : "original-price"
              } style={{fontSize:'16px'}}
            >
              ₹{product.price} 
                
            </span>
           &nbsp;{product.productOf}% off
          </p>
         <p style={{marginTop:'-20px'}}>inclusive all taxes </p> 
          {/* Add to Cart Button */}
          <div className="cart-actions" style={{display:'flex',justifyContent:'s'}}> 
          {cartItem ? (
           
  <div className="quantity-control d-flex align-items-center">
    <div
      className="quantity-container d-flex align-items-center justify-content-between border rounded"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "5px 10px",
        minWidth: "100px",
      }}
    >
      <button
        className="btn btn-sm btn-light"
        onClick={() => handleQuantityChange("decrease")}
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
        {cartItem.quantity}
      </span>
      <button
        className="btn btn-sm btn-light"
        onClick={() => handleQuantityChange("increase")}
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
  </div>
) : (
  <button className="btn btn-primary" onClick={handleAddToCart}>
    Add to Cart
  </button>
)}

             &nbsp; <button className="btn btn-primary" >
               Buy Now 
              </button>
              &nbsp;&nbsp; &nbsp;<span><FaRegHeart style={{fontSize:'18px',color:'red'}}/>
              </span>
          </div>
        
        </div>
      </div>

      <div className="product-specifications mt-5">
      {/* Tab Navigation */}
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "specifications" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("specifications")}
          >
            Specification
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="tab-pane fade show active">
            <table className="table">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="fw-bold">{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="tab-pane fade show active">
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review p-3 mb-4 border rounded">
                  <strong>{review.user}</strong> - {review.rating}★
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
