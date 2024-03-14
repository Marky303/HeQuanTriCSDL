from djoser.serializers import UserCreateSerializer

# Note model for testing
from account.models import Note, UserAccount, Skill, Contact
from rest_framework.serializers import ModelSerializer       
from rest_framework import serializers

# Get custom user model
from django.contrib.auth import get_user_model
User = get_user_model()

# No clue if this is necessary but keep it just in case
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password') 

# Get user info after login serializer
class UserinfoSerializer(ModelSerializer):
    contacts = serializers.StringRelatedField(many=True)
    skills = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = UserAccount
        fields = ('email', 'name', 'currentJob', 'currentLocation', 'shortDesc', 'skills', 'contacts')

# Get user info after login serializer
class UserviewSerializer(ModelSerializer):
    contacts = serializers.StringRelatedField(many=True)
    skills = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = UserAccount
        fields = ('name', 'currentJob', 'currentLocation', 'shortDesc', 'skills', 'contacts')















# Note serializer
class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'