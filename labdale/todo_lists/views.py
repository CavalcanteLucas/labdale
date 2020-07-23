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

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class TodoAPIView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoOwner]

    def get_queryset(self):
        todo_list_id = self.kwargs["todo_list"]
        user = self.request.user
        try:
            todo_list = TodoList.objects.get(id=todo_list_id)
        except:
            raise NotFound()
        if todo_list.owner != self.request.user:
            raise PermissionDenied()
        return Todo.objects.filter(todo_list=todo_list)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        assert serializer.is_valid(raise_exception=True)
        new_todo = Todo(
            title=serializer.validated_data["title"],
            deadline=serializer.validated_data["deadline"],
            todo_list=serializer.validated_data["todo_list"]
        )
        self.check_object_permissions(request, new_todo)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.validated_data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
