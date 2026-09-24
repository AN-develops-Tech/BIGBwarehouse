from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    hero_image_display = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = '__all__'

    def get_hero_image_display(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        return obj.hero_image_url or ""

