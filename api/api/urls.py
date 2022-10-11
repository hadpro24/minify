"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import TemplateView
# from rest_framework.schemas import get_schema_view
# from django.contrib.auth.decorators import login_required
# from django.contrib.admin.views.decorators import staff_member_required

from django.conf.urls import (
    handler404, handler500
)

def error404(request, exception=None):
    return JsonResponse({
        'status_code': 404,
        'detail':'Page non trouvé.'
    }, status=404)

def error500(request):
    return JsonResponse({
        'status_code': 500,
        'detail':"Service temporairement indisponible, réessayez plus tard."
    }, status=500)

handler404 = error404
handler500 = error500

urlpatterns = [
    path('v1/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('v1/', include('app.urls')),
    #doc
    # path('', staff_member_required(
    #     TemplateView.as_view(template_name='swagger-ui.html',
    #         extra_context={'schema_url': 'openapi-schema'}),
    #         login_url='rest_framework:login'
    #     ),
    # name='swagger-ui'),
    #redoc
    # path('openapi', get_schema_view(title='Movie API',
    #     description="Documentation Movie API", version="1.0.0"),
    #     name="openapi-schema"),
    # path('redoc', staff_member_required(TemplateView.as_view(
    #     template_name="redoc.html",
    #     extra_context={'schema_url': 'openapi-schema'}
    #     ), login_url='rest_framework:login'
    #     ), name='redoc'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #only dev
