const API_BASE_URL = 'http://localhost:8000/api';

// Mock tech product database
const TECH_PRODUCTS = [
  {
    id: 1,
    title: "MacBook Pro 14-inch M3 Pro",
    category: "Laptops",
    description: "Apple M3 Pro chip, 18GB unified memory, 512GB SSD storage, 14-inch Liquid Retina XDR display",
    image: "https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_UY436_FMwebp_QL65_.jpg",
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
  },
  {
    id: 11,
    title: "Sony WH-1000XM5",
    category: "Audio",
    description: "Industry-leading noise cancellation, 30-hour battery life, Hi-Res Audio, multipoint connection",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.9, count: 450 },
    basePrice: 399.99
  },
  {
    id: 12,
    title: "Bose QuietComfort Ultra Earbuds",
    category: "Audio",
    description: "Immersive Audio, Adaptive Active Noise Cancelling, 24-hour battery life, sweat and weather resistant",
    image: "https://images.unsplash.com/photo-1606220588911-5117e96a7ccf?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 320 },
    basePrice: 299.99
  },
  {
    id: 13,
    title: "DJI Mavic 3 Pro",
    category: "Drones",
    description: "Triple-camera system, 43-minute flight time, 15km transmission range, 4K/120fps video",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 180 },
    basePrice: 2199.99
  },
  {
    id: 14,
    title: "GoPro HERO12 Black",
    category: "Action Cameras",
    description: "5.3K60 video, 27MP photos, HyperSmooth 6.0 stabilization, 177-degree field of view",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 250 },
    basePrice: 399.99
  },
  {
    id: 15,
    title: "Nintendo Switch OLED",
    category: "Gaming",
    description: "7-inch OLED screen, 64GB internal storage, enhanced audio, wide adjustable stand",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 420 },
    basePrice: 349.99
  },
  {
    id: 16,
    title: "Steam Deck OLED",
    category: "Gaming",
    description: "7.4-inch OLED display, 1TB storage, AMD APU, 50Whr battery, SteamOS",
    image: "https://images.unsplash.com/photo-1612287230202-811afbb5a3a8?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 380 },
    basePrice: 649.99
  },
  {
    id: 17,
    title: "Samsung Odyssey G9",
    category: "Monitors",
    description: "49-inch Dual QHD, 240Hz, 1ms, Quantum Mini-LED, 1000R curvature",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 150 },
    basePrice: 1299.99
  },
  {
    id: 18,
    title: "Logitech MX Master 3S",
    category: "Peripherals",
    description: "Ultra-fast scrolling, 8K DPI, silent clicks, multi-device control, USB-C charging",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 280 },
    basePrice: 99.99
  },
  {
    id: 19,
    title: "Keychron K8 Pro",
    category: "Peripherals",
    description: "Mechanical keyboard, hot-swappable, RGB backlight, Bluetooth 5.1, Mac/Win layout",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 190 },
    basePrice: 119.99
  },
  {
    id: 20,
    title: "Elgato Stream Deck XL",
    category: "Streaming",
    description: "32 customizable LCD keys, multi-action support, plugin ecosystem, USB powered",
    image: "https://images.unsplash.com/photo-1614680376408-81e91afe3ec2?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 160 },
    basePrice: 249.99
  },
  {
    id: 21,
    title: "Razer Kiyo Pro Ultra",
    category: "Streaming",
    description: "4K webcam, HDR, adaptive light sensor, AI-powered background removal",
    image: "https://images.unsplash.com/photo-1614680376408-81e91afe3ec2?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 120 },
    basePrice: 299.99
  },
  {
    id: 22,
    title: "Oculus Quest 3",
    category: "VR",
    description: "Mixed reality, pancake lenses, 4K+ resolution, 120Hz refresh rate, 128GB storage",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 340 },
    basePrice: 499.99
  },
  {
    id: 23,
    title: "Valve Index VR Kit",
    category: "VR",
    description: "Full VR system, 144Hz refresh rate, 130° field of view, finger tracking controllers",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 210 },
    basePrice: 999.99
  },
  {
    id: 24,
    title: "Samsung Galaxy Watch 6 Pro",
    category: "Wearables",
    description: "47mm, LTE, 590mAh battery, sapphire crystal glass, rotating bezel",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 180 },
    basePrice: 449.99
  },
  {
    id: 25,
    title: "Apple Watch Ultra 2",
    category: "Wearables",
    description: "49mm titanium case, dual-frequency GPS, 36-hour battery, depth gauge",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 290 },
    basePrice: 799.99
  },
  {
    id: 26,
    title: "Garmin Fenix 7X Pro",
    category: "Wearables",
    description: "51mm, solar charging, multi-band GPS, 37-day battery, touchscreen",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 150 },
    basePrice: 899.99
  },
  {
    id: 27,
    title: "Samsung Galaxy Z Fold 5",
    category: "Smartphones",
    description: "7.6-inch main display, 6.2-inch cover display, S Pen support, IPX8 water resistance",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 170 },
    basePrice: 1799.99
  },
  {
    id: 28,
    title: "Google Pixel 8 Pro",
    category: "Smartphones",
    description: "6.7-inch LTPO OLED, Tensor G3, 50MP main camera, 5x telephoto",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 220 },
    basePrice: 999.99
  },
  {
    id: 29,
    title: "OnePlus 11",
    category: "Smartphones",
    description: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 50MP main camera, 100W fast charging",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 190 },
    basePrice: 699.99
  },
  {
    id: 30,
    title: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    description: "AMD Ryzen 9, RTX 4090, 32GB RAM, 2TB SSD, 14-inch QHD+ 165Hz",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 140 },
    basePrice: 2499.99
  },
  {
    id: 31,
    title: "Lenovo ThinkPad X1 Carbon",
    category: "Laptops",
    description: "Intel Core i7, 32GB RAM, 1TB SSD, 14-inch 4K display, MIL-STD-810H",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 160 },
    basePrice: 2199.99
  },
  {
    id: 32,
    title: "Microsoft Surface Laptop Studio",
    category: "Laptops",
    description: "Intel Core i7, RTX 3050 Ti, 32GB RAM, 1TB SSD, 14.4-inch 120Hz",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 130 },
    basePrice: 2099.99
  },
  {
    id: 33,
    title: "Samsung Galaxy Tab S9+",
    category: "Tablets",
    description: "12.4-inch AMOLED, Snapdragon 8 Gen 2, 12GB RAM, 512GB storage, S Pen included",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 150 },
    basePrice: 999.99
  },
  {
    id: 34,
    title: "Microsoft Surface Pro 9",
    category: "Tablets",
    description: "13-inch PixelSense, Intel Core i7, 16GB RAM, 512GB SSD, Surface Pen included",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 140 },
    basePrice: 1499.99
  },
  {
    id: 35,
    title: "Lenovo Tab P12 Pro",
    category: "Tablets",
    description: "12.6-inch OLED, Snapdragon 870, 8GB RAM, 256GB storage, Precision Pen 2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 120 },
    basePrice: 799.99
  },
  {
    id: 36,
    title: "ASUS ROG Swift PG32UQX",
    category: "Monitors",
    description: "32-inch 4K, 144Hz, Mini-LED, G-Sync Ultimate, HDR1400",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 90 },
    basePrice: 2999.99
  },
  {
    id: 37,
    title: "LG UltraGear 45GR95QE",
    category: "Monitors",
    description: "45-inch OLED, 240Hz, 0.03ms, G-Sync, HDR10, 800R curvature",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 110 },
    basePrice: 1699.99
  },
  {
    id: 38,
    title: "Alienware AW3423DW",
    category: "Monitors",
    description: "34-inch QD-OLED, 175Hz, 0.1ms, G-Sync Ultimate, HDR400 True Black",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.9, count: 130 },
    basePrice: 1299.99
  },
  {
    id: 39,
    title: "Sony WF-1000XM5",
    category: "Audio",
    description: "True wireless earbuds, industry-leading noise cancellation, 24-hour battery, LDAC",
    image: "https://images.unsplash.com/photo-1606220588911-5117e96a7ccf?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 280 },
    basePrice: 299.99
  },
  {
    id: 40,
    title: "Apple AirPods Max",
    category: "Audio",
    description: "Over-ear headphones, Active Noise Cancellation, Spatial Audio, 20-hour battery",
    image: "https://images.unsplash.com/photo-1606220588911-5117e96a7ccf?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 320 },
    basePrice: 549.99
  },
  {
    id: 41,
    title: "Sennheiser Momentum 4",
    category: "Audio",
    description: "Wireless headphones, Adaptive Noise Cancellation, 60-hour battery, aptX Adaptive",
    image: "https://images.unsplash.com/photo-1606220588911-5117e96a7ccf?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 190 },
    basePrice: 399.99
  },
  {
    id: 42,
    title: "Autel EVO Lite+",
    category: "Drones",
    description: "6K camera, 40-minute flight time, 12km range, obstacle avoidance",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 140 },
    basePrice: 999.99
  },
  {
    id: 43,
    title: "DJI Mini 3 Pro",
    category: "Drones",
    description: "4K/60fps, 47-minute flight time, 12km range, under 249g",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 260 },
    basePrice: 759.99
  },
  {
    id: 44,
    title: "Insta360 X3",
    category: "Action Cameras",
    description: "5.7K 360 video, 4K single-lens, 72MP photos, FlowState stabilization",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 180 },
    basePrice: 449.99
  },
  {
    id: 45,
    title: "DJI Osmo Action 4",
    category: "Action Cameras",
    description: "4K/120fps, 1/1.3-inch sensor, 10-bit color, 160-minute battery",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 150 },
    basePrice: 399.99
  },
  {
    id: 46,
    title: "Razer Blade 18",
    category: "Gaming",
    description: "18-inch QHD+, Intel Core i9, RTX 4090, 32GB RAM, 2TB SSD",
    image: "https://images.unsplash.com/photo-1612287230202-811afbb5a3a8?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 120 },
    basePrice: 3999.99
  },
  {
    id: 47,
    title: "ASUS ROG Strix Scar 18",
    category: "Gaming",
    description: "18-inch QHD+, Intel Core i9, RTX 4090, 64GB RAM, 4TB SSD",
    image: "https://images.unsplash.com/photo-1612287230202-811afbb5a3a8?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 110 },
    basePrice: 4299.99
  },
  {
    id: 48,
    title: "Alienware m18",
    category: "Gaming",
    description: "18-inch QHD+, AMD Ryzen 9, RTX 4090, 32GB RAM, 2TB SSD",
    image: "https://images.unsplash.com/photo-1612287230202-811afbb5a3a8?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 100 },
    basePrice: 3799.99
  },
  {
    id: 49,
    title: "Corsair K100 RGB",
    category: "Peripherals",
    description: "Mechanical keyboard, OPX optical switches, 44-zone RGB, 8MB onboard storage",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 140 },
    basePrice: 229.99
  },
  {
    id: 50,
    title: "Logitech G Pro X Superlight",
    category: "Peripherals",
    description: "Wireless gaming mouse, 25K DPI, 70g weight, 70-hour battery",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.8, count: 220 },
    basePrice: 159.99
  },
  {
    id: 51,
    title: "Elgato Facecam Pro",
    category: "Streaming",
    description: "4K60 webcam, Sony STARVIS sensor, 1080p120, HDR, USB 3.0",
    image: "https://images.unsplash.com/photo-1614680376408-81e91afe3ec2?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 130 },
    basePrice: 299.99
  },
  {
    id: 52,
    title: "GoXLR Mini",
    category: "Streaming",
    description: "Audio mixer, 4-channel faders, 48kHz/24-bit audio, RGB lighting",
    image: "https://images.unsplash.com/photo-1614680376408-81e91afe3ec2?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 150 },
    basePrice: 249.99
  },
  {
    id: 53,
    title: "HTC Vive Pro 2",
    category: "VR",
    description: "5K resolution, 120Hz, SteamVR tracking, 120° field of view",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 120 },
    basePrice: 799.99
  },
  {
    id: 54,
    title: "Pimax Crystal",
    category: "VR",
    description: "QLED+Mini-LED, 2880x2880 per eye, 160Hz, inside-out tracking",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 90 },
    basePrice: 1599.99
  },
  {
    id: 55,
    title: "Garmin Epix Pro",
    category: "Wearables",
    description: "47mm AMOLED, multi-band GPS, 16-day battery, touchscreen",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 140 },
    basePrice: 899.99
  },
  {
    id: 56,
    title: "Suunto 9 Peak Pro",
    category: "Wearables",
    description: "43mm, 25-day battery, dual-frequency GPS, sapphire glass",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 110 },
    basePrice: 549.99
  },
  {
    id: 57,
    title: "Coros Vertix 2",
    category: "Wearables",
    description: "1.4-inch display, 60-day battery, dual-frequency GPS, titanium bezel",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 100 },
    basePrice: 699.99
  },
  {
    id: 58,
    title: "Samsung Galaxy Z Flip 5",
    category: "Smartphones",
    description: "6.7-inch main display, 3.4-inch cover display, Snapdragon 8 Gen 2",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.6, count: 180 },
    basePrice: 999.99
  },
  {
    id: 59,
    title: "Nothing Phone 2",
    category: "Smartphones",
    description: "6.7-inch LTPO OLED, Snapdragon 8+ Gen 1, Glyph Interface, 50MP camera",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.5, count: 150 },
    basePrice: 599.99
  },
  {
    id: 60,
    title: "ASUS ROG Phone 7 Ultimate",
    category: "Smartphones",
    description: "6.78-inch AMOLED, Snapdragon 8 Gen 2, 16GB RAM, 512GB storage",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: { rate: 4.7, count: 130 },
    basePrice: 1299.99
  }
];

// Tech subcategories
const TECH_SUBCATEGORIES = [
  'Laptops',
  'Smartphones',
  'Tablets',
  'Gaming',
  'Monitors',
  'Audio',
  'Drones',
  'Action Cameras',
  'Peripherals',
  'Streaming',
  'VR',
  'Wearables'
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