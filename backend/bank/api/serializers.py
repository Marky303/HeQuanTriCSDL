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
        
# Nesting serializer (just for card name)
class CardNameSerializer(ModelSerializer):
    class Meta:
        model = Card
        fields = ['cardName']        

class TransactionSerializer(ModelSerializer):
    Card = serializers.StringRelatedField(many=False)
    
    class Meta: 
        model = Transaction
        fields = '__all__'