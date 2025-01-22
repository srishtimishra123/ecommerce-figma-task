import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filters from '../FilterProducts/Filters';
import ProductCard from '../ProductCard/ProductCard';
import { addToCart, removeFromCart, updateQuantity } from '../../../redux/cartSlice'; // Import actions

const ProductList = () => {
  const products = useSelector((state) => state.products.filteredItems);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Function to handle adding products to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch action to add product to the cart
  };

  // Function to handle updating quantity (increase, decrease, or remove)
  const handleQuantityChange = (product, actionType) => {
    if (actionType === 'increase') {
      dispatch(updateQuantity({ productId: product.id, quantityChange: 1 }));
    } else if (actionType === 'decrease') {
      dispatch(updateQuantity({ productId: product.id, quantityChange: -1 }));
    } else if (actionType === 'remove') {
      dispatch(removeFromCart(product.id));
    }
  };
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Determine if it's mobile or desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3">
        <div>
      {/* Toggle Button for Mobile View */}
      {isMobileView && (
        <button
          className="toggle-button"
          onClick={() => setShowFilters(!showFilters)}
          style={{border:'1px solid blue',width:'100%',color:'white',backgroundColor:'blue',borderRadius:'5px'}}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      )}

      {/* Filters Section */}
      {(showFilters || !isMobileView) && (
        <div className={`filters-container ${isMobileView ? 'mobile-view' : ''}`}>
          <Filters />
        </div>
      )}
    </div>
        </div>

        {/* Products Section */}
        <div className="col-md-9">
          <div className="row">
            {products.map((product) => {
              const cartProduct = cartItems.find((item) => item.id === product.id);
              return (
                <div key={product.id} className="col-sm-6 col-md-4 mb-4">
                  <ProductCard
                    product={product}
                    addToCart={handleAddToCart}
                    handleQuantityChange={handleQuantityChange}
                    cartProduct={cartProduct}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
