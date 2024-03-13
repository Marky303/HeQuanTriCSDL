from .serializers import NoteSerializer, UserinfoSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Adding models
from ..models import Skill, Contact

# Other libraries for functionality
import ast
import re

# Email regex
emailRegex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

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
    # new_name: non-null string + 255 character length
    if new_name=="":
        content = {'detail': 'New name cannot be blank'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if len(new_name)>255:
        content = {'detail': 'New name is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # new_email: check if new_email is valid + 255 character length
    if re.fullmatch(emailRegex, new_email):
        pass
    else: 
        content = {'detail': 'New email isn\'t valid'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if len(new_email)>255:
        content = {'detail': 'New email is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # new_currentJob: non-null string + 50 character length
    if new_currentJob=="":
        content = {'detail': 'New job cannot be blank'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if len(new_currentJob)>50:
        content = {'detail': 'New profession is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # new_currentLocation: non-null string + 120 character length
    if new_currentLocation=="":
        content = {'detail': 'New location cannot be blank'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if len(new_currentLocation)>120:
        content = {'detail': 'New location is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # new_shortDesc: non-null string + 100 character length
    if new_shortDesc=="":
        content = {'detail': 'New description cannot be blank'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if len(new_shortDesc)>100:
        content = {'detail': 'New description is too long'}
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
    
# Add new skill view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addUserskill(request):
    # Get user from request
    user = request.user
    
    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    userSkill = ast.literal_eval(dict)
    
    # Extract userinfo from request
    new_skill = userSkill['skill']
    
    # Checking eligibility
    if len(new_skill)>20:
        content = {'detail': 'New skill is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # Adding new skill that belongs to user
    new_skill_object = Skill(UserAccount = user, skillContent = new_skill)
    new_skill_object.save()
    
    # Response accepted (good) status
    content = {'detail': 'User skill added successfully'}
    return Response(content, status=status.HTTP_202_ACCEPTED)

# Add new skill view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addUsercontact(request):
    # Get user from request
    user = request.user
    
    # Converting request.body to dictionary type
    dict = request.body.decode("UTF-8")
    userContact = ast.literal_eval(dict)
    
    # Extract userinfo from request
    new_contactType = userContact['contactType']
    new_contactContent = userContact['contactContent']
    
    print(new_contactType+new_contactContent)
    
    # Checking eligibility
    if len(new_contactType)>20:
        content = {'detail': 'New contact type is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    if len(new_contactContent)>120:
        content = {'detail': 'New contact content is too long'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    # Adding new contact that belongs to user
    new_contact_object = Contact(UserAccount = user, contactType = new_contactType, contactContent = new_contactContent)
    new_contact_object.save()
    
    # Response accepted (good) status
    content = {'detail': 'User contact added successfully'}
    return Response(content, status=status.HTTP_202_ACCEPTED)

# Example: get all notes of a certain user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)



