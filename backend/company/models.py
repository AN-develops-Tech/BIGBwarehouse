from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255, default="BigB Warehouse Park")
    tagline = models.CharField(max_length=255, blank=True, default="Prime Logistics & Industrial Infrastructure")
    description = models.TextField(blank=True, default="State-of-the-art industrial warehouse bays with 50-ton heavy weighbridge and 24/7 security.")
    hero_title = models.CharField(max_length=255, blank=True, default="MODERN HIGH-BAY INDUSTRIAL LOGISTICS PARK")
    hero_subtitle = models.TextField(blank=True, default="Secure, scalable, and strategically connected warehouse bays tailored for national logistics and heavy manufacturing.")
    about_text = models.TextField(blank=True, default="BigB Warehouse Park provides premium industrial warehousing, heavy vehicle weight inspection, and round-the-clock logistics operations.")
    phone = models.CharField(max_length=50, blank=True, default="+91 98765 43210")
    email = models.EmailField(blank=True, default="contact@bigbwarehouse.com")
    whatsapp = models.CharField(max_length=50, blank=True, default="+91 98765 43210")
    address = models.TextField(blank=True, default="Plot 42, Industrial Logistics Corridor, Highway 44")
    google_maps_url = models.URLField(blank=True, max_length=500)
    hero_image = models.ImageField(upload_to="company/", blank=True, null=True)
    hero_image_url = models.URLField(max_length=1000, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Company Information"
        verbose_name_plural = "Company Information"
        
    def __str__(self):
        return self.name

