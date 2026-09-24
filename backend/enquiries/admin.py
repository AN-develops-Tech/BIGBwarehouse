from django.contrib import admin
from .models import Enquiry

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'company_name', 'phone', 'email', 'requirement', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'requirement')
    search_fields = ('full_name', 'company_name', 'email', 'phone')
    ordering = ('-created_at',)
    
    # Let admins update status from the list view
    list_editable = ('status',)
