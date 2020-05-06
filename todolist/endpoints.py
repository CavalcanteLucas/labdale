from django.conf.urls import include, url
from rest_framework import routers

from .api import TodoListViewSet

router = routers.DefaultRouter()
router.register("todos", TodoListViewSet, "todolists")

urlpatterns = [
    url("^", include(router.urls)),
]
