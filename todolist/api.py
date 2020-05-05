from rest_framework import viewsets, permissions, generics

from .models import TodoList
from .serializers import TodoListSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
