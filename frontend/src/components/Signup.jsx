import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
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
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      if (response.ok) {
        setMessage("Signup successful! Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.error("Signup error response:", jsonData);
        setError(jsonData.error || "Error occurred during signup.");
      }
    } catch (err) {
      console.error("Signup exception:", err);
      setError("An error occurred during signup.");
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {message && <p className="message" style={{ color: "green" }}>{message}</p>}
      {error && <p className="message" style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
