from django.urls import path
from .views import CardListCreateAPIView, CardDetailAPIView, TransactionListCreateAPIView, TransactionDetailAPIView

urlpatterns = [
    path('cards/', CardListCreateAPIView.as_view(), name='card-list-create'),
    path('cards/<int:pk>/', CardDetailAPIView.as_view(), name='card-detail'),
    path('transactions/', TransactionListCreateAPIView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', TransactionDetailAPIView.as_view(), name='transaction-detail'),
]
