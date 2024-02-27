from django.urls import path

# Importing related views
from . import views

# Setting up urls patterns
urlpatterns = [
    # Getting notes view
    path('', views.getNotes)
]