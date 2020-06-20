from model_bakery import baker
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from labdale.todo_lists.models import Todo, TodoList
from labdale.todo_lists.serializers import TodoSerializer

class TodoTests(TestCase):
    def test_todo__str__(self):
        todo = baker.make("Todo")
        self.assertEqual(todo.__str__(),todo.title)
        self.assertEqual(str(todo),todo.title)

    ##
    # CREATE
    ##
    def test_create_todo_requires_authorization(self):
        pass

    def test_create_todo_is_private(self):
        pass

    def test_create_todo_requires_data(self):
        pass

    def test_create_todo(self):
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

        # Client creates todo successfully
        self.assertEqual(0, Todo.objects.count())
        sample = TodoSerializer(baker.prepare("Todo", todo_list=todo_list))
        url = reverse("todo_lists:todo")
        response = self.client.post(
            path=url,
            content_type="application/json",
            data=sample.data,
            **headers
        )
        todo_created = Todo.objects.get()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(1, response.data["id"])
        self.assertEqual(sample.data["title"], todo_created.title)
        self.assertEqual(user.id, todo_created.todo_list.owner.pk)