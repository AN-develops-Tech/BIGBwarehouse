import os
import shutil
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings
from django.core.files import File
from company.models import Company
from facilities.models import Facility
from gallery.models import GalleryImage

FRONTEND_IMAGES_DIR = os.path.abspath(
    os.path.join(settings.BASE_DIR, '..', 'frontend', 'src', 'assets', 'images')
)

print(f"Loading assets from: {FRONTEND_IMAGES_DIR}")

# 1. Seed or Update Company Information
company, created = Company.objects.get_or_create(id=1)
company.name = "BIGB WAREHOUSE PARK"
company.tagline = "More Than Storage. A Complete Space for Your Business to Store, Handle & Move with Confidence."
company.description = "Modern, heavy-duty industrial storage, 50-Ton weighbridge scale, and logistics infrastructure in Parippally, Kerala."
company.hero_title = "BIGB WAREHOUSE PARK"
company.hero_subtitle = "State-of-the-art high-bay industrial warehouse facility & logistics hub in Parippally, Kerala."
company.about_text = "BigB Warehouse Park in Parippally, Kerala provides heavy-duty high-bay warehouse storage, on-site 50-ton digital weighbridge, mobile Hydra Crane heavy lifting, union-free loading docks, and 24/7 monitored logistics infrastructure."
company.phone = "+91 7909294488"
company.email = "contact@bigbwarehouse.com"
company.whatsapp = "+91 7909294488"
company.address = "Ezhippuram, ESI Back Road, Parippally, Kollam District, Kerala - 691574"
company.google_maps_url = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d268.88578880065893!2d76.74759820103648!3d8.804608495159428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBigB!5e1!3m2!1sen!2sin!4v1788549504015!5m2!1sen!2sin"

hero_src = os.path.join(FRONTEND_IMAGES_DIR, 'hero.png')
if os.path.exists(hero_src):
    with open(hero_src, 'rb') as f:
        company.hero_image.save('hero.png', File(f), save=False)

company.save()
print("Company seeded successfully.")

# 2. Seed Facilities
facilities_data = [
    {
        "title": "High-Bay Warehouse Storage",
        "icon": "Warehouse",
        "description": "Spacious heavy-duty warehouse bays with 30ft ceiling clearance, epoxy concrete flooring, and high pallet racking capacity suitable for commercial inventory.",
        "image_filename": "interior.png"
    },
    {
        "title": "In-House 50-Ton Weighbridge",
        "icon": "Scale",
        "description": "Dedicated heavy-duty 50-ton digital weighbridge scale on-site for fast, accurate gross & tare weight verification of all arriving and departing trucks.",
        "image_filename": "weighbridge.png"
    },
    {
        "title": "Union-Free Loading & Unloading",
        "icon": "ShieldCheck",
        "description": "100% union-interference-free operations. Enjoy smooth, uninterrupted 24/7 dock loading and unloading without external labor disputes or operational halts.",
        "image_filename": "loading_docks.png"
    },
    {
        "title": "Hydra Crane Heavy Lifting Services",
        "icon": "Truck",
        "description": "On-site heavy industrial mobile Hydra Crane equipped for fast loading, unloading, and precision placement of heavy machinery, equipment, and bulk cargo.",
        "image_filename": "hydra_crane.png"
    },
    {
        "title": "In-House Labors",
        "icon": "Users",
        "description": "Dedicated trained in-house labor workforce available for rapid cargo handling, loading & unloading, and inventory stacking.",
        "image_filename": "labor_ops.png"
    },
    {
        "title": "Ample Industrial Power & Electricity",
        "icon": "Zap",
        "description": "Uninterrupted 3-phase high-voltage electrical grid connection with high-capacity power backup to ensure continuous 24/7 operational lighting and machinery function.",
        "image_filename": "power_electricity.png"
    },
    {
        "title": "Heavy Truck & Trailer Parking Yard",
        "icon": "ParkingCircle",
        "description": "Expansive asphalt staging yard designed with wide turning radii for 18-wheeler articulated trailers, high-mast LED floodlights, and 24/7 security gates.",
        "image_filename": "parking_yard.png"
    }
]

Facility.objects.all().delete()
for fac in facilities_data:
    obj = Facility(
        title=fac["title"],
        icon=fac["icon"],
        description=fac["description"],
        is_active=True
    )
    img_path = os.path.join(FRONTEND_IMAGES_DIR, fac["image_filename"])
    if os.path.exists(img_path):
        with open(img_path, 'rb') as f:
            obj.image.save(fac["image_filename"], File(f), save=False)
    obj.save()
print(f"Facilities seeded: {Facility.objects.count()} records.")

# 3. Seed Gallery Images
gallery_data = [
    {
        "title": "BigB Warehouse Dusk Exterior",
        "category": "Warehouse",
        "description": "High-bay LED illuminated exterior view of modern industrial warehouse bays and paved truck yard.",
        "image_filename": "hero.png"
    },
    {
        "title": "High-Bay Pallet Racking",
        "category": "Warehouse",
        "description": "Multi-tier heavy duty industrial steel racking systems with electric forklift operating down aisle.",
        "image_filename": "interior.png"
    },
    {
        "title": "50-Ton Heavy Weighbridge",
        "category": "Facilities",
        "description": "Commercial scale platform with digital LED weight monitoring monitor and safety rails.",
        "image_filename": "weighbridge.png"
    },
    {
        "title": "Hydraulic Loading Dock Bays",
        "category": "Loading",
        "description": "Active loading dock shutter doors with hydraulic dock leveler for container trucks.",
        "image_filename": "loading_docks.png"
    },
    {
        "title": "Commercial Trailer Parking Yard",
        "category": "Parking",
        "description": "Spacious asphalt staging yard for heavy cargo logistics trailers and 18-wheelers.",
        "image_filename": "parking_yard.png"
    },
    {
        "title": "Logistics Fulfillment & Safety Team",
        "category": "Facilities",
        "description": "High-visibility safety gear team managing inventory scanning and cargo handling.",
        "image_filename": "labor_ops.png"
    },
    {
        "title": "Hydra Crane Heavy Equipment Handling",
        "category": "Facilities",
        "description": "On-site mobile crane executing heavy machinery lifting and repositioning.",
        "image_filename": "hydra_crane.png"
    },
    {
        "title": "High-Voltage Power Infrastructure",
        "category": "Facilities",
        "description": "Dedicated 3-phase high capacity electrical power distribution hub.",
        "image_filename": "power_electricity.png"
    }
]

GalleryImage.objects.all().delete()
for gal in gallery_data:
    obj = GalleryImage(
        title=gal["title"],
        category=gal["category"],
        description=gal["description"],
        is_active=True
    )
    img_path = os.path.join(FRONTEND_IMAGES_DIR, gal["image_filename"])
    if os.path.exists(img_path):
        with open(img_path, 'rb') as f:
            obj.image.save(gal["image_filename"], File(f), save=False)
    obj.save()
print(f"Gallery seeded: {GalleryImage.objects.count()} records.")

# 4. Create or Update Superuser
from django.contrib.auth import get_user_model
User = get_user_model()
admin_user, _ = User.objects.get_or_create(username='Bigbadmin')
admin_user.set_password('Bigb@admin123')
admin_user.is_staff = True
admin_user.is_superuser = True
admin_user.save()
print("Superuser Bigbadmin (Bigb@admin123) configured successfully.")

print("All user data seeded into backend database successfully!")
