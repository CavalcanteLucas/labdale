from django.contrib import admin

from .models import TodoList, Todo


class TodoListAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "owner",
        "created_at"
    ]


class TodoAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "deadline",
        "todo_list",
        "created_at"
    ]


admin.site.register(Todo, TodoAdmin)
admin.site.register(TodoList, TodoListAdmin)
