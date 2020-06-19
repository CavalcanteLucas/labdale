from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "deadline",
        "todo_list",
        "created_at"
    ]


admin.site.register(Todo, TodoAdmin)
