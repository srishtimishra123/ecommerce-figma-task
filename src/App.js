import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import ProductList from './components/products/ProductListing/ProductList';
import ProductDetails from './components/products/ProductDetails/ProductDetails';
import Filters from './components/products/FilterProducts/Filters';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-layout">
       
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
