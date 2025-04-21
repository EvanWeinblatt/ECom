import React, { useState, useEffect, useCallback, useRef } from "react";
import "./ProductList.css";
import { fetchProducts, fetchCategories } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import { ToastContainer } from "./Toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [toasts, setToasts] = useState([]);
  
  // Create a ref to store the timeout
  const searchTimeoutRef = useRef(null);

  const addToast = (message, type = 'success') => {
    const newToast = {
      id: Date.now(),
      message,
      type
    };
    setToasts(currentToasts => [...currentToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };

  const loadProducts = useCallback(async (query, category) => {
    try {
      setLoading(true);
      const data = await fetchProducts(category || selectedCategory, query);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const handleAddToCart = (product, comparison) => {
    const cartItem = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: parseFloat(comparison.price), // Convert string price to number
      retailer: comparison.retailer,
      url: comparison.url
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = [...existingCart, cartItem];
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Show toast notification
    addToast(`${product.title} added to cart`);
  };

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(["All", ...data]);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        JSON.parse(savedCart); // Just validate the JSON, we don't need the parsed result
      } catch (error) {
        console.error('Error parsing cart:', error);
      }
    }
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    // Convert category to title case for consistency
    const formattedCategory = category === 'All' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    setSelectedCategory(formattedCategory);
    setSearchQuery(""); // Clear search when changing category
    loadProducts("", formattedCategory); // Pass the category directly to loadProducts
  };

  // Debounced search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      loadProducts(value, selectedCategory);
    }, 300);
  };

  // Initial load and load when category or search changes
  useEffect(() => {
    loadProducts(searchQuery, selectedCategory);
  }, [loadProducts, selectedCategory, searchQuery]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="product-page">
      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
      <div className="page-header">
        <h3>Find the best deals on your favorite tech products</h3>
      </div>
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tech products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} className="product-image" />
                </div>
                <h3>{product.title}</h3>
                <p className="category-tag">{product.category}</p>
                <p className="description">{product.description}</p>
                <div className="rating">
                  <span>Rating: {product.rating.rate} ({product.rating.count} reviews)</span>
                </div>
                <div className="price-comparison">
                  <h4>Price Comparison:</h4>
                  {product.priceComparisons.map((comparison, index) => (
                    <div key={index} className={`price-row ${index === 0 ? 'best-price' : ''}`}>
                      <span className="retailer-name">{comparison.retailer}</span>
                      <span className="price-amount">${comparison.price}</span>
                      <div className="action-buttons">
                        <a 
                          href={comparison.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`view-deal ${!comparison.inStock ? 'out-of-stock' : ''}`}
                          title={`Search for ${product.title} on ${comparison.retailer}`}
                        >
                          {comparison.inStock ? 'View Deal' : 'Out of Stock'}
                        </a>
                        {comparison.inStock && (
                          <button 
                            className="add-to-cart-button"
                            onClick={() => handleAddToCart(product, comparison)}
                            title="Add to Cart"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No tech products found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList; 