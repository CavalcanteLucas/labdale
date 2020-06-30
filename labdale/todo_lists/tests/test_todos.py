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
        self.assertEqual(todo.__str__(), todo.title)
        self.assertEqual(str(todo), todo.title)

    ##
    # LIST
    ##
    def test_list_todos_of_a_todo_list_requires_authorization(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        todo_list = baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Attempt to retrieve todo lists, should fail with 401
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list.id})
        response = self.client.get(path=url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_list_todos_of_a_todo_list_is_private(self):
        # Create two distinct users
        user_1 = baker.make("User")
        user_2 = baker.make("User")
        self.assertEqual(2, User.objects.count())

        # Create 2 todo lists with 'user_1' as owner
        todo_list_1 = baker.make("TodoList", owner=user_1)
        todo_list_2 = baker.make("TodoList", owner=user_1)
        self.assertEqual(2, TodoList.objects.count())

        # Create a todo for 'todo_list_1'
        baker.make("Todo", todo_list=todo_list_1)
        self.assertEqual(1, Todo.objects.count())

        # Test privacy among users
        ##
        # Authenticate 'user_2'
        token, created = Token.objects.get_or_create(user=user_2)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Client asks for todo lists, none should be available
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list_1.id})
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

        # Client asks for todo lists, none should be available
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list_2.id})
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

        # Test privacy among todo lists
        ##
        # Authenticate 'user_1'
        token, created = Token.objects.get_or_create(user=user_1)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Client asks for todo lists, two should be available
        url = reverse("todo_lists:todo_list")
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, len(response.data))

        # Client asks for todos from todo_list_2, none should be available
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list_2.id})
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, len(response.data))

    def test_list_todos_of_a_todo_list(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        todo_list = baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Create todo
        todo = baker.make("Todo", todo_list=todo_list)
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Client asks for the list of Todos of a non existent TodoList
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list.id + 1})
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

        # Client asks for the list of Todos of a valid TodoList successfully
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list.id})
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(todo.title, response.data[0]["title"])
        self.assertEqual(
            todo.deadline.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            response.data[0]["deadline"],
        )
        self.assertEqual(todo.todo_list.id, response.data[0]["todo_list"])

    ##
    # CREATE
    ##
    def test_create_todo_for_a_todo_list_requires_authorization(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        todo_list = baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Attempt to create todo list, should fail with 401
        sample = TodoSerializer(baker.prepare("Todo", todo_list=todo_list))
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list.id})
        response = self.client.post(
            path=url, content_type="application/json", data=sample.data,
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_create_todo_for_a_todo_list_requires_data(self):
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

        # Attempt to create todo, should fail with 400
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list.id})
        response = self.client.post(
            path=url, content_type="application/json", **headers
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(3, len(response.data))
        self.assertEqual("required", response.data["title"][0].code)
        self.assertEqual("required", response.data["deadline"][0].code)
        self.assertEqual("required", response.data["todo_list"][0].code)

    def test_create_todo_for_a_todo_list(self):
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
        url = reverse("todo_lists:todos", kwargs={"todo_list": todo_list.id})
        response = self.client.post(
            path=url, content_type="application/json", data=sample.data, **headers
        )
        todo_created = Todo.objects.get()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(1, response.data["id"])
        self.assertEqual(sample.data["title"], todo_created.title)
        self.assertEqual(user, todo_created.todo_list.owner)
