from django.db import models

class CategoryChoices(models.TextChoices):
    WAREHOUSE = 'Warehouse', 'Warehouse'
    LOADING = 'Loading', 'Loading'
    PARKING = 'Parking', 'Parking'
    FACILITIES = 'Facilities', 'Facilities'
    HERO = 'Hero', 'Hero'
    ABOUT = 'About', 'About'
    GENERAL = 'General', 'General'

class GalleryImage(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="gallery/", blank=True, null=True)
    image_url = models.URLField(max_length=1000, blank=True, null=True)
    category = models.CharField(
        max_length=50,
        choices=CategoryChoices.choices,
        default=CategoryChoices.WAREHOUSE,
        db_index=True
    )
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True, db_index=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Gallery Images"
        
    def __str__(self):
        return f"{self.title} ({self.category})"
