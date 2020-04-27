from django.urls import include, path

from todo_auth.api import RegistrationAPI

urlpatterns = [
    path("register/", RegistrationAPI.as_view(), name="register"),
    path("", include("knox.urls")),
]
