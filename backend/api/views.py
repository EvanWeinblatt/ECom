from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, PriceHistory
from .serializers import ProductSerializer, PriceHistorySerializer
import requests
from bs4 import BeautifulSoup
import os
from django.conf import settings
import aiohttp
import asyncio
from concurrent.futures import ThreadPoolExecutor

User = get_user_model()

@api_view(['POST'])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({"error": "Username, email, and password are required."},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
    except Exception as e:
        return Response({"error": "User creation failed: " + str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        print("Error generating JWT tokens:", e)
        return Response({"error": "User created but token generation failed: " + str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials."},
                        status=status.HTTP_401_UNAUTHORIZED)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)

        if category and category != 'All':
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset

@api_view(['GET'])
@permission_classes([IsAuthenticated])
async def fetch_product_prices(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        
        # Initialize price fetchers for different stores
        price_fetchers = [
            fetch_amazon_price(product),
            fetch_bestbuy_price(product),
            fetch_newegg_price(product)
        ]
        
        # Gather all prices asynchronously
        prices = await asyncio.gather(*price_fetchers, return_exceptions=True)
        
        # Filter out any failed requests and save valid prices
        valid_prices = [price for price in prices if price and isinstance(price, dict)]
        
        for price_data in valid_prices:
            PriceHistory.objects.create(
                product=product,
                store=price_data['store'],
                price=price_data['price'],
                store_url=price_data['url']
            )
        
        # Return the latest prices
        latest_prices = PriceHistory.objects.filter(product=product).order_by('store', '-timestamp').distinct('store')
        serializer = PriceHistorySerializer(latest_prices, many=True)
        
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Price fetching functions for different stores
async def fetch_amazon_price(product):
    # You'll need to set up an Amazon Product Advertising API account
    # This is a simplified example
    try:
        # Use Amazon Product API client here
        return {
            'store': 'Amazon',
            'price': 999.99,  # Replace with actual price
            'url': f'https://amazon.com/dp/{product.model_number}'
        }
    except Exception:
        return None

async def fetch_bestbuy_price(product):
    # You'll need a Best Buy API key
    api_key = os.getenv('BESTBUY_API_KEY')
    if not api_key:
        return None
    
    try:
        url = f'https://api.bestbuy.com/v1/products(model={product.model_number})?apiKey={api_key}&format=json'
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
                if data['products']:
                    return {
                        'store': 'Best Buy',
                        'price': data['products'][0]['salePrice'],
                        'url': data['products'][0]['url']
                    }
    except Exception:
        return None

async def fetch_newegg_price(product):
    # You'll need to set up Newegg API access
    try:
        # Use Newegg API client here
        return {
            'store': 'Newegg',
            'price': 989.99,  # Replace with actual price
            'url': f'https://newegg.com/p/{product.model_number}'
        }
    except Exception:
        return None
