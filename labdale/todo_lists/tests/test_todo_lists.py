from model_bakery import baker
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from labdale.todo_lists.models import TodoList
from labdale.todo_lists.serializers import TodoListSerializer


class TodoListTests(TestCase):
    def test_todo_list__str__(self):
        todo_list = baker.make("TodoList")
        self.assertEqual(str(todo_list), todo_list.title)

    ##
    # LIST
    ##
    def test_list_todo_lists_requires_authorization(self):
        # Attempt to retrieve todo lists, should fail with 401
        url = reverse("todo_lists:todo_list")
        response = self.client.get(path=url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

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
        url = reverse("todo_lists:todo_list")
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, len(response.data))

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
        url = reverse("todo_lists:todo_list")
        response = self.client.get(path=url, **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(todo_list.title, response.data[0]["title"])
        self.assertEqual(todo_list.owner.pk, response.data[0]["owner"])

    ##
    # CREATE
    ##
    def test_create_todo_list_requires_authorization(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Attempt to create todo list, should fail with 401
        sample = {"title": "This is a new title for the To-Do List"}
        url = reverse("todo_lists:todo_list")
        response = self.client.post(
            path=url, content_type="application/json", data=sample
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_create_todo_list_requires_data(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Attempt to create todo list, should fail with 400
        url = reverse("todo_lists:todo_list")
        response = self.client.post(
            path=url, content_type="application/json", **headers
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
        sample = TodoListSerializer(baker.prepare("TodoList"))
        url = reverse("todo_lists:todo_list")
        response = self.client.post(
            path=url, content_type="application/json", data=sample.data, **headers
        )
        todo_list_created = TodoList.objects.get()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(1, response.data["id"])
        self.assertEqual(sample.data["title"], todo_list_created.title)
        self.assertEqual(user.id, todo_list_created.owner.pk)

    ##
    # READ
    ##
    def test_get_todo_list_requires_authorization(self):
        # Create todo list
        baker.make("TodoList")
        self.assertEqual(1, TodoList.objects.count())

        # Attempt to retrieve todo list, should fail with 401
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.get(path=url, content_type="application/json",)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_todo_list_is_private(self):
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

        # Attempt to retrieve todo list from 'user 1', should fail with 403
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.get(path=url, content_type="application/json", **headers)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_todo_list(self):
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

        # Retrieve todo list
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.get(path=url, content_type="application/json", **headers)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(todo_list.title, response.data["title"])
        self.assertEqual(todo_list.owner.pk, response.data["owner"])
        self.assertEqual(todo_list.id, response.data["id"])

    ##
    # UPDATE
    ##
    def test_edit_todo_list_requires_authorization(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Attempt to edit todo list title, should fail with 401
        sample = {"title": "This is a new title for the To-Do List"}
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.put(
            path=url, content_type="application/json", data=sample
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_edit_todo_list_is_private(self):
        # Create two distinct users
        user_1 = baker.make("User")
        user_2 = baker.make("User")
        self.assertEqual(2, User.objects.count())

        # Create todo list with 'user_1' as owner
        todo_list = baker.make("TodoList", owner=user_1)
        todo_list_title = todo_list.title
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate 'user_2'
        token, created = Token.objects.get_or_create(user=user_2)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Attempt to edit todo list title as 'user_1', should fail with 403
        sample = {"title": "This is a new title for the To-Do List"}
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.put(
            path=url, content_type="application/json", data=sample, **headers
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
        self.assertEqual(todo_list_title, TodoList.objects.get().title)

    def test_edit_todo_list(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Edit todo list successfully
        sample = TodoListSerializer(baker.prepare("TodoList"))
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.put(
            path=url, content_type="application/json", data=sample.data, **headers
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(sample.data["title"], response.data["title"])
        self.assertEqual(sample.data["title"], TodoList.objects.get().title)

    ##
    # DESTROY
    ##
    def test_delete_todo_list_requires_authorization(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Attempt to delete todo list, should fail with 401
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.delete(path=url, content_type="application/json")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_delete_todo_list_is_private(self):
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

        # Attempt to delete todo list, should fail with 403
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.delete(
            path=url, content_type="application/json", **headers
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_delete_todo_list(self):
        # Create user
        user = baker.make("User")
        self.assertEqual(1, User.objects.count())

        # Create todo list
        baker.make("TodoList", owner=user)
        self.assertEqual(1, TodoList.objects.count())

        # Authenticate user
        token, created = Token.objects.get_or_create(user=user)
        self.assertTrue(created)
        headers = {"HTTP_AUTHORIZATION": "Token " + token.key}

        # Delete todo list successfully
        url = reverse("todo_lists:todo_list_detail", kwargs={"pk": 1})
        response = self.client.delete(
            path=url, content_type="application/json", **headers
        )
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertEqual(0, TodoList.objects.count())
