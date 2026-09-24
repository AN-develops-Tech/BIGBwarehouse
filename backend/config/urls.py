from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from company.views import CompanyViewSet
from facilities.views import FacilityViewSet
from gallery.views import GalleryImageViewSet
from enquiries.views import EnquiryViewSet
from users.views import AuthMeView

router = DefaultRouter()
router.register(r'company', CompanyViewSet, basename='company')
router.register(r'facilities', FacilityViewSet, basename='facilities')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')
router.register(r'enquiries', EnquiryViewSet, basename='enquiries')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # Auth endpoints
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/me/', AuthMeView.as_view(), name='auth_me'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'BigB Warehouse Park Administration'
admin.site.site_title = 'BigB Admin Portal'
admin.site.index_title = 'Welcome to the BigB Warehouse Management Portal'
