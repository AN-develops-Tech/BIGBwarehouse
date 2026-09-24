from rest_framework import viewsets, permissions
from .models import Enquiry
from .serializers import EnquirySerializer

class EnquiryPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Anyone can create an enquiry
        if request.method == 'POST':
            return True
        # For reading/updating/deleting, user must be admin
        return request.user and request.user.is_staff

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquirySerializer
    permission_classes = [EnquiryPermission]
