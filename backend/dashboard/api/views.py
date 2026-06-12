from rest_framework.views import APIView
from rest_framework.response import Response

from alerts.models import Alert
from news.models import News


class DashboardStatsAPIView(APIView):

    def get(self, request):

        categories = {
            "plastic": Alert.objects.filter(
                category="PLASTIC",
                status="VALIDATED"
            ).count(),

            "erosion": Alert.objects.filter(
                category="EROSION",
                status="VALIDATED"
            ).count(),

            "waste": Alert.objects.filter(
                category="WASTE",
                status="VALIDATED"
            ).count(),

            "flood": Alert.objects.filter(
                category="FLOOD",
                status="VALIDATED"
            ).count(),

            "water": Alert.objects.filter(
                category="WATER",
                status="VALIDATED"
            ).count(),

            "air": Alert.objects.filter(
                category="AIR",
                status="VALIDATED"
            ).count(),
        }

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

            "categories":
                categories,
        })