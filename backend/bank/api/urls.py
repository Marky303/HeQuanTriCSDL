from django.urls import path

# Importing related views
from . import views

# Setting up urls patterns
urlpatterns = [
    path('getcardinfo/', views.getCardinfo),
    path('getcardsinfo/', views.getCardsinfo),
    path('gettransactionsinfo/', views.getTransactionsinfo),
]