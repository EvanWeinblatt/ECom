const API_BASE_URL = 'http://localhost:8000/api';

// Mock tech product database
const TECH_PRODUCTS = [
  {
    id: 1,
    title: "MacBook Pro 14-inch M3 Pro",
    category: "Laptops",
    description: "Apple M3 Pro chip, 18GB unified memory, 512GB SSD storage, 14-inch Liquid Retina XDR display",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 120 },
    basePrice: 1999.00
  },
  {
    id: 2,
    title: "Dell XPS 15",
    category: "Laptops",
    description: "Intel Core i7-13700H, 16GB RAM, 1TB SSD, NVIDIA RTX 4050, 15.6\" 4K OLED",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 95 },
    basePrice: 1999.99
  },
  {
    id: 3,
    title: "iPhone 15 Pro Max",
    category: "Smartphones",
    description: "6.7-inch Super Retina XDR display, A17 Pro chip, 48MP camera system, Titanium design",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283811",
    rating: { rate: 4.9, count: 210 },
    basePrice: 1199.00
  },
  {
    id: 4,
    title: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    description: "6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera, S Pen included",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6570/6570299_sd.jpg",
    rating: { rate: 4.8, count: 180 },
    basePrice: 1299.99
  },
  {
    id: 5,
    title: "iPad Pro 12.9-inch",
    category: "Tablets",
    description: "M2 chip, 12.9-inch Liquid Retina XDR display, 256GB storage, Wi-Fi + Cellular",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-ipad-pro-12-wifi-spacegray-2021?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1674663706569",
    rating: { rate: 4.7, count: 150 },
    basePrice: 1099.00
  },
  {
    id: 6,
    title: "Samsung Galaxy Tab S9 Ultra",
    category: "Tablets",
    description: "14.6-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 12GB RAM, 512GB storage",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/a37b0e55-056c-41ad-9dd7-b46e464e150d.jpg",
    rating: { rate: 4.6, count: 85 },
    basePrice: 1199.99
  },
  {
    id: 7,
    title: "PlayStation 5",
    category: "Gaming",
    description: "Ultra-high speed SSD, 4K graphics, DualSense wireless controller, 825GB storage",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.9, count: 320 },
    basePrice: 499.99
  },
  {
    id: 8,
    title: "Xbox Series X",
    category: "Gaming",
    description: "12 Teraflops of power, 1TB SSD, 4K gaming, Backward compatibility",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 280 },
    basePrice: 499.99
  },
  {
    id: 9,
    title: "Dell UltraSharp U2723QE",
    category: "Monitors",
    description: "27-inch 4K UHD IPS Black panel, USB-C connectivity, 90W power delivery",
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2723qe/spi/ng/monitor-u2723qe-campaign-hero-504x350-ng.psd?fmt=jpg&wid=504&hei=350",
    rating: { rate: 4.7, count: 75 },
    basePrice: 699.99
  },
  {
    id: 10,
    title: "LG UltraFine 32UN880-B",
    category: "Monitors",
    description: "32-inch 4K UHD IPS display, USB-C connectivity, Ergo stand",
    image: "https://m.media-amazon.com/images/I/718c9x5rZ6L.jpg",
    rating: { rate: 4.6, count: 65 },
    basePrice: 799.99
  }
];

// Tech subcategories
const TECH_SUBCATEGORIES = [
  'Laptops',
  'Smartphones',
  'Tablets',
  'Gaming',
  'Monitors'
];

// Generate prices using the backend price checker
const generatePrices = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-prices/${encodeURIComponent(product.title)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }
    
    const prices = await response.json();
    
    return Object.entries(prices).map(([retailer, price]) => ({
      retailer,
      url: getRetailerUrl(retailer, product.title),
      price: price ? price.toFixed(2) : 'N/A',
      inStock: price !== null
    })).sort((a, b) => {
      if (a.price === 'N/A') return 1;
      if (b.price === 'N/A') return -1;
      return parseFloat(a.price) - parseFloat(b.price);
    });
  } catch (error) {
    console.error('Error fetching real-time prices:', error);
    // Fallback to mock prices if the backend is unavailable
    return generateMockPrices(product);
  }
};

// Helper function to get retailer URLs
const getRetailerUrl = (retailer, productName) => {
  const retailers = {
    'Amazon': {
      baseUrl: 'https://www.amazon.com/s?k=',
      searchParam: '&ref=nb_sb_noss'
    },
    'Best Buy': {
      baseUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st=',
      searchParam: '&_dyncharset=UTF-8'
    },
    'Newegg': {
      baseUrl: 'https://www.newegg.com/p/pl?d=',
      searchParam: '&N=-1'
    },
    'B&H Photo': {
      baseUrl: 'https://www.bhphotovideo.com/c/search?Ntt=',
      searchParam: '&N=0'
    }
  };

  const retailerInfo = retailers[retailer];
  if (!retailerInfo) return '#';
  
  const searchQuery = encodeURIComponent(productName);
  return `${retailerInfo.baseUrl}${searchQuery}${retailerInfo.searchParam}`;
};

// Fallback mock price generator
const generateMockPrices = (product) => {
  return [
    {
      retailer: 'Amazon',
      url: getRetailerUrl('Amazon', product.title),
      price: product.basePrice.toFixed(2),
      inStock: true
    },
    {
      retailer: 'Best Buy',
      url: getRetailerUrl('Best Buy', product.title),
      price: (product.basePrice * 1.01).toFixed(2),
      inStock: true
    },
    {
      retailer: 'Newegg',
      url: getRetailerUrl('Newegg', product.title),
      price: (product.basePrice * 0.99).toFixed(2),
      inStock: true
    },
    {
      retailer: 'B&H Photo',
      url: getRetailerUrl('B&H Photo', product.title),
      price: product.basePrice.toFixed(2),
      inStock: true
    }
  ].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export const fetchProducts = async (category = 'All', searchQuery = '') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let products = TECH_PRODUCTS;

    // Filter by category if specified
    if (category !== 'All') {
      products = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query if specified
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Add price comparisons
    products = await Promise.all(products.map(async product => ({
      ...product,
      priceComparisons: await generatePrices(product)
    })));

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  return TECH_SUBCATEGORIES;
};

export const fetchProductPrices = async (productId) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_BASE_URL}/products/${productId}/prices/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product prices');
  }

  return response.json();
}; 