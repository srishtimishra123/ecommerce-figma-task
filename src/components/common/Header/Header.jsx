import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Header.css';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">
        {/* Use Link for client-side routing */}
        <Link
          to="/"  // Path to navigate to
          className="btn btn-link text-decoration-none"
          style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}
        >
          Store
        </Link>
      </div>
      <input type="text" placeholder="Search for products..." className="search-bar" />
      <div className="icons">
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cartCount}</span>
        <span className="profile-icon">👤</span>
      </div>
    </header>
  );
};

export default Header;
