from django.contrib import admin

from .models import TodoList, Todo


class TodoListAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "owner",
    ]


class TodoAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "deadline",
        "todo_list",
        "is_done"
    ]


admin.site.register(Todo, TodoAdmin)
admin.site.register(TodoList, TodoListAdmin)
