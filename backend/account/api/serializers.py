from djoser.serializers import UserCreateSerializer

# Note model for testing
from account.models import Note, UserAccount
from rest_framework.serializers import ModelSerializer       

# Get custom user model
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password') 
        
# Get username after login serializer
class UserinfoSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('email', 'name')

# Note serializer
class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'