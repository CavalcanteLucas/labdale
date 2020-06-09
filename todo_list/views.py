from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response

from .models import TodoList
from .serializers import TodoListSerializer


class IsTodoListOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class TodoListAPIView(generics.ListCreateAPIView):
    serializer_class = TodoListSerializer
    permission_classes = [permissions.IsAuthenticated, IsTodoListOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return TodoList.objects.filter(owner=user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoListDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = [permissions.IsAuthenticated, IsTodoListOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)
