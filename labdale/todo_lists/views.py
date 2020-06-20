from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response

from .models import TodoList, Todo
from .serializers import TodoListSerializer, TodoSerializer

class IsTodoListOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsTodoOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.todo_list.owner == request.user


class TodoListAPIView(generics.ListCreateAPIView):
    serializer_class = TodoListSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoListOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return TodoList.objects.filter(owner=user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoListDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoListOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class TodoAPIView(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoOwnerOrReadOnly]

