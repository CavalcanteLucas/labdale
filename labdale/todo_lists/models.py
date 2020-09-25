from django.db import models
from django.contrib.auth.models import User


class TodoList(models.Model):
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="todo_lists", on_delete=models.CASCADE, null=False
    )

    def __str__(self):
        return self.title


class Todo(models.Model):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField()
    todo_list = models.ForeignKey(TodoList, on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
