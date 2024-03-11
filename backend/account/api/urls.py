from django.urls import path

# Importing related views
from . import views

# Setting up urls patterns
urlpatterns = [
    # Note example url
    path('getnotes/', views.getNotes),
    path('getuserinfo/', views.getUserinfo),
]