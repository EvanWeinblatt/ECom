import bson

def generate_object_id():
    return str(bson.ObjectId())


from djongo import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

import bson
def generate_object_id():
    return str(bson.ObjectId())

class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")
        return self.create_user(username, email, password, **extra_fields)

class MyUser(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(
        primary_key=True,
        max_length=24,
        default=generate_object_id,
        editable=False
    )
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

class Product(models.Model):
    id = models.CharField(
        primary_key=True,
        max_length=24,
        default=generate_object_id,
        editable=False
    )
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    image_url = models.URLField()
    description = models.TextField(blank=True)
    model_number = models.CharField(max_length=100, blank=True)
    brand = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class PriceHistory(models.Model):
    id = models.CharField(
        primary_key=True,
        max_length=24,
        default=generate_object_id,
        editable=False
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price_histories')
    store = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    store_url = models.URLField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.product.name} - {self.store} - ${self.price}"
