from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
)

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from alerts.models import Alert
from alerts.api.serializers import AlertSerializer
from rest_framework.views import APIView
from rest_framework.response import Response



class AlertListCreateAPIView(
    ListCreateAPIView
):

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    serializer_class = AlertSerializer

    def get_queryset(self):
        return Alert.objects.filter(
            status="VALIDATED"
        ).order_by("-created_at")
    

class LatestAlertsAPIView(ListAPIView):

    serializer_class = AlertSerializer

    def get_queryset(self):
        return Alert.objects.filter(
            status="VALIDATED"
        ).order_by("-created_at")[:3]
    
class AlertStatsAPIView(APIView):

    def get(self, request):

        total_alerts = Alert.objects.count()

        validated_alerts = Alert.objects.filter(
            status="VALIDATED"
        ).count()

        categories = (
            Alert.objects.values(
                "category"
            )
            .distinct()
            .count()
        )

        return Response({
            "total_alerts": total_alerts,
            "validated_alerts": validated_alerts,
            "categories": categories,
        })