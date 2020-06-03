from django.urls import include, path
from rest_framework import routers

from .views import TodoListAPIView, TodoListDetailAPIView

app_name = "todo_list"
urlpatterns = [
    path("", TodoListAPIView.as_view(), name="todo_list"),
    path("<int:pk>/", TodoListDetailAPIView.as_view(), name="todo_list_detail"),
]
