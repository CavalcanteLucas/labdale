from django.db import models
from django.contrib.auth.models import User


class TodoList(models.Model):
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="todo_lists", on_delete=models.CASCADE, null=False
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Todo(models.Model):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField(blank=True)
    todo_list = models.ForeignKey(TodoList, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title