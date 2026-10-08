from django.db import models

class EnquiryStatus(models.TextChoices):
    NEW = 'NEW', 'New'
    VERIFIED = 'VERIFIED', 'Verified'
    CONTACTED = 'CONTACTED', 'Contacted'
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    CLOSED = 'CLOSED', 'Closed'

class Enquiry(models.Model):
    full_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    requirement = models.CharField(max_length=150)
    message = models.TextField()
    status = models.CharField(
        max_length=50, 
        choices=EnquiryStatus.choices, 
        default=EnquiryStatus.NEW,
        db_index=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Enquiries"
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Enquiry from {self.full_name} ({self.get_status_display()})"
