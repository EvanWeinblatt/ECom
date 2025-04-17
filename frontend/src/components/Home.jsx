import React from "react";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Tech Price Comparison</h1>
        <p>Find the best deals on your favorite tech products</p>
      </header>
      <ProductList />
    </div>
  );
};

export default Home;
