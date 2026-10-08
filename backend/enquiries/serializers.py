from rest_framework import serializers
from .models import Enquiry

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = '__all__'
        extra_kwargs = {
            'message': {'required': False, 'allow_blank': True}
        }
