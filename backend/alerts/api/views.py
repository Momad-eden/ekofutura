from rest_framework.generics import (
    ListCreateAPIView,
)

from alerts.models import Alert
from alerts.api.serializers import AlertSerializer


class AlertListCreateAPIView(ListCreateAPIView):

    serializer_class = AlertSerializer

    def get_queryset(self):
        return Alert.objects.filter(
            status="VALIDATED"
        ).order_by("-created_at")