from django.urls import include, path
from rest_framework import routers

from .views import TodoListAPIView

app_name = "todo_list"
urlpatterns = [
    path("", TodoListAPIView.as_view(), name="todo_list"),
]
