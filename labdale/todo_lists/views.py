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

    def get_todo_list(self):
        todo_list_id = self.kwargs["todo_list"]
        user = self.request.user
        try:
            todo_list = TodoList.objects.get(id=todo_list_id)
        except:
            raise NotFound()
        if todo_list.owner != self.request.user:
            raise PermissionDenied()
        return todo_list

    def get_queryset(self):
        return Todo.objects.filter(todo_list=self.get_todo_list())

    def post(self, request, *args, **kwargs):
        request.data["todo_list"] = self.get_todo_list().id
        return self.create(request, *args, **kwargs)

class TodoDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoOwner]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)