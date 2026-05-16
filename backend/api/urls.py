from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('products/', products),
    path('register/', register),
    path('login/', TokenObtainPairView.as_view()),
]