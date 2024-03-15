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
from decimal import Decimal
import datetime as dt
from django.db.models import Sum

# Get card info view/ Scrapped since GET method body is frowned upon
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getCardinfo(request):
#     user = request.user
    
#     # Converting request.body to dictionary type
#     dict = request.body.decode("UTF-8")
#     data = ast.literal_eval(dict)
    
#     # Extracting card id from request
#     id = data['id']
    
#     # Checking if user owns the card
#     try:
#         card = Card.objects.get(id=id)
#     except:
#         content = {'detail': 'Card does not belong to user'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
#     # Serialize card and return response
#     serializer = CardSerializer(card)
#     return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCard(request):
    user = request.user

    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    data = ast.literal_eval(dict)
    
    # Extracting card name from request
    name = data['name']

    # Creating a new card for the user
    try: 
        Card.createNewCard(name, user)
    except:
        content = {'detail': 'Cannot create new card'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
    content = {'detail': 'Created new card!'}
    return Response(content, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCardsinfo(request):
    user = request.user

    # Getting all user cards
    cards = user.cards.all()
    
    # Serialize card and return response
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTransaction(request):
    user = request.user

    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    data = ast.literal_eval(dict)
    
    # Extracting transaction data from request
    name = data['name']
    amount = data['amount']
    try: 
        amount = Decimal(amount)
    except:
        content = {'detail': 'Amount is not a decimal'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    id = data['id']
    
    # Getting user card that was used to make the transaction
    try: 
        card = Card.objects.get(id=id)
    except: 
        content = {'detail': 'Cannot find card'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # Creating a new transaction
    transactionStatus = ""
    try:
        transactionStatus = Transaction.createNewTransaction(name, amount, user, card)
    except:
        # Some other error that havent been detected
        content = {'detail': 'Cannot create new card'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if (transactionStatus=="nocard"):
        content = {'detail': 'Cannot find user\'s card'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    elif (transactionStatus=="insufficientbal"):
        content = {'detail': 'Not enough balance'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)    
    content = {'detail': 'Transaction made successfully'}
    return Response(content, status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getTransactionsinfo(request):
    user = request.user

    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    data = ast.literal_eval(dict)
    
    # Extracting transaction data from request
    id = data['id']
    dayStart = data['dayStart']
    dayEnd = data['dayEnd']

    # Query
    # Query with join on transaction and card
    if id == "null":
        # Get all user's transaction
        transactions = Transaction.objects.all().select_related('Card')
    else:
        # Get all user's cards' transaction
        transactions = Transaction.objects.all().select_related('Card').filter(Card_id=id)
    
    # Query with composite condition + subquery with time
    
    
    
    # Prefetch object to speed up query
    transactions.prefetch_related('Card')
    
    # Serialize transactions and return response
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getmonthlytransactionvalue(request):
    user = request.user

    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    data = ast.literal_eval(dict)
    
    # Extracting transaction data from request
    id = data['id']
    
    # Get first and last date of this month
    last_date = dt.date.today()
    nxt_mnth = last_date.replace(day=28) + dt.timedelta(days=4)
    last_date = nxt_mnth - dt.timedelta(days=nxt_mnth.day)
    
    first_date = dt.date.today()
    if first_date.day > 25:
        first_date += dt.timedelta(7)
    first_date = first_date.replace(day=1)
    
    # Query
    plus = Transaction.objects.all().select_related('Card').filter(Card_id=id).filter(Tcreation__range=[first_date, last_date]).filter(amount__gt=0).aggregate(Sum('amount'))
    minus = Transaction.objects.all().select_related('Card').filter(Card_id=id).filter(Tcreation__range=[first_date, last_date]).filter(amount__lt=0).aggregate(Sum('amount'))

    # Test
    content = {'plus': plus, 'minus': minus}
    return Response(content, status=status.HTTP_202_ACCEPTED)