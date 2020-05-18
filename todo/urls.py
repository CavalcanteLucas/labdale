from django.conf.urls import include, url
from rest_framework import routers

from .views import TodoListAPIView

urlpatterns = [
    url("^", TodoListAPIView.as_view()),
]
