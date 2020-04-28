from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TodoList

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'title', 'owner')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', )
