from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import signup, login, ProductViewSet, fetch_product_prices

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('', include(router.urls)),
    path('products/<str:product_id>/prices/', fetch_product_prices, name='fetch-prices'),
]
