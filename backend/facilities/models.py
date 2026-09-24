from django.db import models

class Facility(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True, help_text="Lucide icon name (e.g. Warehouse, Scale)")
    image = models.ImageField(upload_to="facilities/", blank=True, null=True)
    image_url = models.URLField(max_length=1000, blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Facilities"
        
    def __str__(self):
        return self.title
