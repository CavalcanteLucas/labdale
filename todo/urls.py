from django.urls import include, path
from rest_framework import routers

from .views import TodoListAPIView, TodoListCreateAPIView

urlpatterns = [
    path("", TodoListAPIView.as_view()),
    path("create/", TodoListCreateAPIView.as_view())
]
