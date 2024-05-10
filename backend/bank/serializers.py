from rest_framework import serializers
from .models import Card, Transaction

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'UserAccount', 'cardName', 'number', 'cvv', 'bal', 'Ccreation', 'Cexpiration', 'grad1', 'grad2', 'gradDeg']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'Card', 'transactionName', 'Tcreation', 'amount']
