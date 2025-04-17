from rest_framework import serializers
from .models import Product, PriceHistory

class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['id', 'store', 'price', 'currency', 'store_url', 'timestamp']

class ProductSerializer(serializers.ModelSerializer):
    latest_prices = PriceHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'image_url', 'description', 
                 'model_number', 'brand', 'latest_prices'] 