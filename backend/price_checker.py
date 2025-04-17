from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import asyncio
from bs4 import BeautifulSoup
import re
from typing import Dict, List
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache to store recent price checks
price_cache = {}
CACHE_DURATION = 3600  # 1 hour in seconds

async def get_amazon_price(product_name: str) -> float:
    """Get price from Amazon using their API or web scraping"""
    # This is a placeholder - in production, you'd use Amazon's Product Advertising API
    # or implement proper web scraping with rate limiting
    return 0.0

async def get_bestbuy_price(product_name: str) -> float:
    """Get price from Best Buy using their API"""
    # This is a placeholder - in production, you'd use Best Buy's API
    return 0.0

async def get_newegg_price(product_name: str) -> float:
    """Get price from Newegg using their API"""
    # This is a placeholder - in production, you'd use Newegg's API
    return 0.0

async def get_bhphoto_price(product_name: str) -> float:
    """Get price from B&H Photo using their API"""
    # This is a placeholder - in production, you'd use B&H Photo's API
    return 0.0

async def check_all_prices(product_name: str) -> Dict[str, float]:
    """Check prices from all retailers concurrently"""
    tasks = [
        get_amazon_price(product_name),
        get_bestbuy_price(product_name),
        get_newegg_price(product_name),
        get_bhphoto_price(product_name)
    ]
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    return {
        "Amazon": results[0] if not isinstance(results[0], Exception) else None,
        "Best Buy": results[1] if not isinstance(results[1], Exception) else None,
        "Newegg": results[2] if not isinstance(results[2], Exception) else None,
        "B&H Photo": results[3] if not isinstance(results[3], Exception) else None
    }

@app.get("/api/check-prices/{product_name}")
async def check_prices(product_name: str):
    """Endpoint to check prices for a product"""
    # Check cache first
    if product_name in price_cache:
        cached_data = price_cache[product_name]
        if cached_data["timestamp"] + CACHE_DURATION > asyncio.get_event_loop().time():
            return cached_data["prices"]
    
    try:
        prices = await check_all_prices(product_name)
        # Update cache
        price_cache[product_name] = {
            "prices": prices,
            "timestamp": asyncio.get_event_loop().time()
        }
        return prices
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 