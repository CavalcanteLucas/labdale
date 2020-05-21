from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from .models import TodoList
from .serializers import TodoListSerializer


class TodoListAPIView(generics.ListCreateAPIView):
    serializer_class = TodoListSerializer

    def get_queryset(self):
        user = self.request.user
        return reversed(TodoList.objects.filter(owner=user))

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)