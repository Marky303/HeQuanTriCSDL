from account.models import Note
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from rest_framework.response import Response

# Example: get all notes of a certain user
@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)