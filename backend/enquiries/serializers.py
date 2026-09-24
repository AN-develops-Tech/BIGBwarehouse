from rest_framework import serializers
from .models import Enquiry

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        # Mark status as read_only so public users cannot set it when posting
        fields = '__all__'
        read_only_fields = ['status']
