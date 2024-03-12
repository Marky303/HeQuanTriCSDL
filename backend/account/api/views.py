# Note example
from .serializers import NoteSerializer, UserinfoSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import ast

# Get user info view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserinfo(request):
    user = request.user
    serializer = UserinfoSerializer(user)
    return Response(serializer.data)

# Update user info view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateUserinfo(request):
    # Get user from request
    user = request.user
    
    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    userinfo = ast.literal_eval(dict)
    
    # Extract userinfo from request
    new_name = userinfo['name']
    new_email = userinfo['email']
    new_currentJob = userinfo['currentJob']
    new_currentLocation = userinfo['currentLocation']
    new_shortDesc = userinfo['shortDesc']
    
    # Check if sent user info is ok
    # new_name
    if new_name=="":
        content = {'detail': 'New name cannot be blank'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
    # Edit user info
    user.name = new_name
    user.email = new_email
    user.currentJob = new_currentJob
    user.currentLocation = new_currentLocation
    user.shortDesc = new_shortDesc
    
    # Save new info
    user.save()
    
    # Response accepted (good) status
    content = {'detail': 'User profile changed successfully'}
    return Response(content, status=status.HTTP_202_ACCEPTED)
    
    



# Example: get all notes of a certain user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)



