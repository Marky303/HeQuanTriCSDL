# Note example
from .serializers import NoteSerializer, UserinfoSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Get username view (can be modified to get user information)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserinfo(request):
    user = request.user
    serializer = UserinfoSerializer(user)
    return Response(serializer.data)

# Example: get all notes of a certain user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)



