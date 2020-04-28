from django.conf.urls import include, url
from rest_framework import routers

from .api import TodoListViewSet, UserAPI

router = routers.DefaultRouter()
router.register('todos', TodoListViewSet, "todolists")

urlpatterns = [
    url("^", include(router.urls)),
    url("^user/$", UserAPI.as_view()),
]
