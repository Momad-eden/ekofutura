from rest_framework.views import APIView
from rest_framework.response import Response

from alerts.models import Alert
from news.models import News


class DashboardStatsAPIView(APIView):

    def get(self, request):

        return Response({
            "validated_alerts":
                Alert.objects.filter(
                    status="VALIDATED"
                ).count(),

            "pending_alerts":
                Alert.objects.filter(
                    status="PENDING"
                ).count(),

            "alerts_with_photo":
                Alert.objects.exclude(
                    photo=""
                ).exclude(
                    photo__isnull=True
                ).count(),

            "published_news":
                News.objects.filter(
                    published=True
                ).count(),
        })