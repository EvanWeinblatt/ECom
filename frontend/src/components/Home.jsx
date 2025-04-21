import React from "react";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>SimpliTech Price Comparison</h1>
      </header>

      <ProductList />
    </div>
  );
};

export default Home;
