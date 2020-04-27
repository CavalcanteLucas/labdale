from rest_framework import generics, status
from rest_framework.response import Response

from knox.models import AuthToken

from todo_auth.serializers import RegisterSerializer, UserSerializer


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        context = self.get_serializer_context()
        content = {
            "user": UserSerializer(user, context=context).data,
            "token": AuthToken.objects.create(user)[1],
        }
        return Response(content, status=status.HTTP_201_CREATED)
