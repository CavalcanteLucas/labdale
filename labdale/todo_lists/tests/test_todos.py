from django.test import TestCase
from model_bakery import baker

from labdale.todo_lists.models import Todo


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
        pass