# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Define a simple view for the root URL
def home(request):
    return HttpResponse("Welcome to the ECom API!")

urlpatterns = [
    path('', home, name="home"),            # New route for the root path
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),        # Routes for your API endpoints
]
