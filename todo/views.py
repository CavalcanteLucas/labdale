from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer


class TodoList(generics.ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(owner=user)
