from django.test import TestCase
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
        self.url = reverse("todo_list:todo_list")

    def test_list_todo_lists_requires_authorization(self):
        response = self.client.get(path=self.url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_list_todo_lists(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        todo_list = baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Client asks for todo lists successfully
        response = self.client.get(path=self.url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(todo_list.title, response.data[0]["title"])
        self.assertEqual(todo_list.owner.pk, response.data[0]["owner"])

    def test_list_todo_lists_is_private(self):
        # Create two distinct users
        user_1 = baker.make("User")
        user_2 = baker.make("User")
        self.assertEqual(2, User.objects.count())

        # Create todo list with 'user_1' as owner
        baker.make("TodoList", owner=user_1)
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate 'user_2'
        token, created = Token.objects.get_or_create(user=user_2)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Client asks for todo lists, none should be available
        response = self.client.get(path=self.url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, len(response.data))

    def test_create_todo_list_requires_data(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Try to create list passing no 'title' as data, results in bad request
        response = self.client.post(
            path=self.url, content_type="application/json", **headers
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual("required", response.data["title"][0].code)

    def test_create_todo_list(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Client creates todo list successfully
        self.assertEqual(0, TodoList.objects.count())
        todo_list_sample = {"title": "This is a sample title for a To-Do List"}
        response = self.client.post(
            path=self.url,
            content_type="application/json",
            data=todo_list_sample,
            **headers
        )
        todo_list_created = TodoList.objects.get()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(1, response.data["id"])
        self.assertEqual(todo_list_sample["title"], todo_list_created.title)
        self.assertEqual(user.id, todo_list_created.owner.pk)
