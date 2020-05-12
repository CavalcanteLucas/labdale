from django.conf.urls import include, url
from rest_framework import routers

from .views import TodoList

urlpatterns = [
    url("^", TodoList.as_view()),
]
