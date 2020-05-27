from django.test import Client, TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from model_bakery import baker

from todo_list.models import TodoList

User = get_user_model()


class TodoListTests(TestCase):
    def setUp(self):
        # Route
        self.url = reverse("dashboard")
        # Header
        self.content_type = "application/json"

    def test_create_todo_list(self):
        # Create user
        user_sample = baker.prepare("User")
        user = User.objects.create_user(
            username=user_sample.username,
            email=user_sample.email,
            password=user_sample.password,
        )
        self.assertEqual(1, User.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        client = Client(HTTP_AUTHORIZATION="Token " + token.key)

        # Create todo list
        data = {"title": baker.prepare("TodoList").title, "owner": user.pk}
        client.post(path=self.url, content_type=self.content_type, data=data)
        self.assertEqual(1, TodoList.objects.count())
        self.assertEqual(data["title"], TodoList.objects.get(id=1).title)
        self.assertEqual(data["owner"], TodoList.objects.get(id=1).owner.pk)
