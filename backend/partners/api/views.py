from rest_framework.generics import (
    ListAPIView,
)

from partners.models import Partner

from partners.api.serializers import (
    PartnerSerializer,
)


class PartnerListAPIView(
    ListAPIView
):

    serializer_class = (
        PartnerSerializer
    )

    def get_queryset(self):
        return (
            Partner.objects
            .filter(active=True)
            .order_by("name")
        )