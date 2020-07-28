from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound

from .models import TodoList, Todo
from .serializers import TodoListSerializer, TodoSerializer


class IsTodoListOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsTodoOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.todo_list.owner == request.user

class BelongsToTodoList(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.todo_list.id == request.data["todo_list"]

class TodoListAPIView(generics.ListCreateAPIView):
    serializer_class = TodoListSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoListOwner]

    def get_queryset(self):
        user = self.request.user
        return TodoList.objects.filter(owner=user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoListDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoListOwner]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class TodoAPIView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoOwner]
    queryset = Todo.objects.all()

    def get_todo_list(self):
        try:
            todo_list = TodoList.objects.get(id=self.kwargs["todo_list"])
        except:
            raise NotFound()
        if todo_list.owner != self.request.user:
            raise PermissionDenied()
        return todo_list

    def get_queryset(self):
        return Todo.objects.filter(todo_list=self.get_todo_list())

    def perform_create(self, serializer):
        serializer.save(todo_list=self.get_todo_list())

class TodoDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoOwner & BelongsToTodoList]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)