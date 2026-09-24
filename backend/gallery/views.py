from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import GalleryImage
from .serializers import GalleryImageSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        # Admin users can see all gallery images. Public users see only active ones.
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return GalleryImage.objects.all().order_by('-created_at')
        return GalleryImage.objects.filter(is_active=True).order_by('-created_at')

