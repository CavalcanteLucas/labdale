from django.urls import include, path
from rest_framework import routers

from .views import (TodoListAPIView,
    TodoListDetailAPIView, TodoAPIView, TodoDetailAPIView)

app_name = "todo_lists"
urlpatterns = [
    path("", TodoListAPIView.as_view(), name="todo_list"),
    path("<int:pk>/", TodoListDetailAPIView.as_view(), name="todo_list_detail"),
    path("<int:todo_list>/todos/", TodoAPIView.as_view(), name="todos"),
    path("<int:todo_list>/todos/<int:pk>/", TodoDetailAPIView.as_view(), name='todo_detail')
]
