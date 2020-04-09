from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from model_mommy import mommy

User = get_user_model()


class AccountTests(TestCase):
    def test_create_account(self):

        url = reverse("register")
        user_sample = mommy.prepare("User")
        data = {"username": user_sample.username, "password": user_sample.password}
        # There are no users
        self.assertEqual(0, User.objects.count())

        response = self.client.post(url, data)
        # User has been created sucessfully
        self.assertEqual(1, User.objects.count())
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        user = User.objects.get(id=1)
        expected_user_data = {"username": user.username, "id": user.id}
        # API confirms user creation
        self.assertEqual(expected_user_data, response.data["user"])
        self.assertIn(user.auth_token_set.get().token_key, response.data["token"])

        response = self.client.post(url, data)
        # API blocks repeated users to be created
        self.assertEqual(
            "A user with that username already exists.",
            str(response.data["username"][0]),
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

        data = {
            "username": user_sample.username, 
            "password": ""
        }
        response = self.client.post(url, data)
        # API blocks user creation with blank password
        self.assertEqual(
            "This field may not be blank.", str(response.data["password"][0])
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

        data = {
            "username": "",
            "password": user_sample.password,
        }
        response = self.client.post(url, data)
        # API blocks user creation with blank username
        self.assertEqual(
            "This field may not be blank.", str(response.data["username"][0])
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
