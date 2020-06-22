from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response

from .models import TodoList, Todo
from .serializers import TodoListSerializer, TodoSerializer

class IsTodoListOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsTodoOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        todo_list = TodoList.objects.get(id=obj["todo_list"].id)
        return todo_list.owner.id == request.user.id


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


class TodoAPIView(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated & IsTodoOwner]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.check_object_permissions(request, serializer.validated_data)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

