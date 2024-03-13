from django.urls import path

# Importing related views
from . import views

# Setting up urls patterns
urlpatterns = [
    # path('getcardinfo/', views.getCardinfo),
    path('getcardsinfo/', views.getCardsinfo),
    path('createcard/', views.createCard),
    path('gettransactionsinfo/', views.getTransactionsinfo),
    path('maketransaction/', views.createTransaction)
]