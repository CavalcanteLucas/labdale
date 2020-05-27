from django.urls import include, path
from rest_framework import routers

from .views import TodoListAPIView

urlpatterns = [
    path("", TodoListAPIView.as_view(), name="dashboard"),
]
