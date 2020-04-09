from rest_framework import generics, status
from rest_framework.response import Response

from knox.models import AuthToken

from todo_auth.serializers import CreateUserSerializer, UserSerializer


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        content = {
            "user": UserSerializer(
                        user,
                        context=self.get_serializer_context()
                    ).data,
            "token": AuthToken.objects.create(user)[1],
        }
        return Response(content, status=status.HTTP_201_CREATED)
