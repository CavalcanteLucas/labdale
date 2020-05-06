from django.contrib import admin

from .models import TodoList


class TodoListAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "owner", "created_at"]


admin.site.register(TodoList, TodoListAdmin)
