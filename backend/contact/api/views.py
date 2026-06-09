from rest_framework.generics import (
    CreateAPIView,
)

from contact.models import (
    ContactMessage,
)

from contact.api.serializers import (
    ContactMessageSerializer,
)


class ContactMessageCreateAPIView(
    CreateAPIView
):

    queryset = (
        ContactMessage.objects.all()
    )

    serializer_class = (
        ContactMessageSerializer
    )