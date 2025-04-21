import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to SimpliTech</h1>
      <div className="button-group">
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default WelcomePage;
