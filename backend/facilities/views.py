from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Facility
from .serializers import FacilitySerializer

class FacilityViewSet(viewsets.ModelViewSet):
    serializer_class = FacilitySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        # Admin users can see all facilities. Public users see only active ones.
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Facility.objects.all().order_by('-created_at')
        return Facility.objects.filter(is_active=True).order_by('-created_at')

