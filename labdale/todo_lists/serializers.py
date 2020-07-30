from rest_framework import serializers
from .models import Todo, TodoList
from datetime import datetime
from django.utils import timezone


class TodoListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )

    def create(self, validated_data):
        return TodoList.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.owner = validated_data.get("owner", instance.owner)
        instance.save()
        return instance


class TodoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    deadline = serializers.DateTimeField()
    todo_list = serializers.PrimaryKeyRelatedField(queryset=TodoList.objects.all())
    is_done = serializers.BooleanField()

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.deadline = validated_data.get("deadline", instance.deadline)
        instance.is_done = validated_data.get("is_done", instance.is_done)
        instance.save()
        return instance
