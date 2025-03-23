import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username: formData.identifier, password: formData.password }),
      });
      const jsonData = await response.json();
      if (response.ok) {
        setMessage("Login successful! Redirecting to home page...");
        localStorage.setItem("access_token", jsonData.access);
        localStorage.setItem("refresh_token", jsonData.refresh);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setError(jsonData.error || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {message && <p className="message" style={{ color: "green" }}>{message}</p>}
      {error && <p className="message" style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
