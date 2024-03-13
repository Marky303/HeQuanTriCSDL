from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Importing serializers
from .serializers import CardSerializer, TransactionSerializer

# Importing models
from ..models import Card, Transaction, UserAccount

# Other libraries
import ast

# Get card info view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCardinfo(request):
    user = request.user
    
    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    data = ast.literal_eval(dict)
    
    # Extracting card id from request
    id = data['id']
    
    # Checking if user owns the card
    try:
        card = Card.objects.get(id=id)
    except:
        content = {'detail': 'Card does not belong to user'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # Serialize card and return response
    serializer = CardSerializer(card)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCardsinfo(request):
    user = request.user

    # Getting all user cards
    cards = user.cards.all()
    
    # Serialize card and return response
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTransactionsinfo(request):
    user = request.user

    # Getting all user cards
    transactions = user.transactions.all()
    
    # Serialize card and return response
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)