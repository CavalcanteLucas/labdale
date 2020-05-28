from django.test import Client, TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from model_bakery import baker
import requests

from todo_list.models import TodoList

User = get_user_model()


class TodoListTests(TestCase):
    def setUp(self):
        # Route
        self.url = reverse("todo_list:todo_list")

    def test_list_todo_lists_requires_authorization(self):
        client = Client()
        response = client.get(path=self.url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_list_todo_lists(self):
        # Create user
        user = User.objects.create_user(baker.prepare("User"))
        self.assertEqual(1, User.objects.count())

        # Create todo list
        todo_list = TodoList.objects.create(
            title=baker.prepare("TodoList").title, owner=user
        )
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        client = Client(HTTP_AUTHORIZATION="Token " + token.key)

        # Client asks for todo lists successfully
        response = client.get(path=self.url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(todo_list.title, response.data[0]["title"])
        self.assertEqual(todo_list.owner.pk, response.data[0]["owner"])

    def test_list_todo_lists_is_private(self):
        # Create two distinct users
        user_1 = User.objects.create_user(baker.prepare("User"))
        user_2 = User.objects.create_user(baker.prepare("User"))
        self.assertEqual(2, User.objects.count())

        # Create todo list with user_1 as owner
        TodoList.objects.create(title=baker.prepare("TodoList").title, owner=user_1)
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate user_2
        token, created = Token.objects.get_or_create(user=user_2)
        self.assertTrue(created)
        client = Client(HTTP_AUTHORIZATION="Token " + token.key)

        # Client asks for todo lists, none should be available
        response = client.get(path=self.url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, len(response.data))

    def test_create_todo_list(self):
        # Create user
        user = User.objects.create_user(baker.prepare("User"))
        self.assertEqual(1, User.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        client = Client(HTTP_AUTHORIZATION="Token " + token.key)

        # Client creates todo list successfully
        todo_list_sample = {"title": baker.prepare("TodoList").title, "owner": user.pk}
        response = client.post(
            path=self.url, content_type="application/json", data=todo_list_sample
        )
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(1, TodoList.objects.count())
        self.assertEqual(todo_list_sample["title"], TodoList.objects.get(id=1).title)
        self.assertEqual(todo_list_sample["owner"], TodoList.objects.get(id=1).owner.pk)
