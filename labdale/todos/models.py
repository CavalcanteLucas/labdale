from django.db import models

from labdale.todo_lists.models import TodoList

class Todo(models.Model):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField(blank=True)
    todo_list = models.ForeignKey(TodoList, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title