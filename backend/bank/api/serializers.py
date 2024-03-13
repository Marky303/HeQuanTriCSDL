from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer       
from rest_framework import serializers

# Importing models
from bank.models import Card, Transaction

# Card info serializer
class CardSerializer(ModelSerializer):
    class Meta: 
        model = Card
        fields = '__all__'
        
class TransactionSerializer(ModelSerializer):
    class Meta: 
        model = Transaction
        fields = '__all__'