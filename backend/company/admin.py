from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'updated_at')
    
    def has_add_permission(self, request):
        # Allow adding a company only if none exists
        if Company.objects.exists():
            return False
        return super().has_add_permission(request)
