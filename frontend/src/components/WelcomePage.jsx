import React from "react";
import "./WelcomePage.css"; // Import the styles

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="title">Welcome to <span className="highlight">SimpliTech</span></h1>
      <p className="subtitle">
        Your one-stop destination for the latest and greatest tech gadgets.
        Explore our curated collection of cutting-edge devices at unbeatable prices.
      </p>
      <button className="shop-button">Shop Now</button>
    </div>
  );
};

export default WelcomePage;