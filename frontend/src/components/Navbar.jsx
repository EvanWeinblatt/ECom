import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <nav>
      <div>
        <Link to="/">Welcome</Link>
        {token ? (
          <Link to="/home">Home</Link>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
