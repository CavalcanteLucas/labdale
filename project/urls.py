"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.views.generic import TemplateView
from django.urls import re_path, path, include

from todolist import endpoints as todolist_enpoints

frontend_urls = [
    path("", include("pwa.urls")),
    # re_path(r"^.*$", TemplateView.as_view(template_name="frontend/index.html")),
]

urlpatterns = [
    # This URL is used to generate email content
    re_path(
        r"^password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$",
        TemplateView.as_view(template_name="frontend/index.html"),
        name="password_reset_confirm",
    ),
    path("api/rest-auth/registration/", include("rest_auth.registration.urls")),
    path("api/rest-auth/", include("rest_auth.urls")),
    path("api/todo-list/", include(todolist_enpoints)),
    # path("", include(todolist_enpoints))
    path("admin/", admin.site.urls)

] + frontend_urls
