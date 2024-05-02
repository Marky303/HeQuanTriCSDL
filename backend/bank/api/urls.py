from django.urls import path

# Importing related views
from . import views

# Setting up urls patterns
urlpatterns = [
    # path('getcardinfo/', views.getCardinfo),
    path('getcardsinfo/', views.getCardsinfo),
    path('createcard/', views.createCard),
    path('maketransaction/', views.createTransaction),
    path('gettransactionsinfo/', views.getTransactionsinfo),
    path('gettransactionlist/', views.getTransactionsList),
    
    path('getmonthlytransactionvalue/', views.getmonthlytransactionvalue),
]