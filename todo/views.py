from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from .models import TodoList
from .serializers import TodoSerializer


class TodoListAPIView(generics.ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return TodoList.objects.filter(owner=user)
