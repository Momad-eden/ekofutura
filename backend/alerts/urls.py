from django.urls import path

from alerts.api.views import (
    AlertListCreateAPIView,
    LatestAlertsAPIView,
    AlertStatsAPIView,
)

urlpatterns = [
    path(
        "",
        AlertListCreateAPIView.as_view(),
        name="alerts-list-create",
    ),

    path(
        "latest/",
        LatestAlertsAPIView.as_view(),
        name="alerts-latest",
    ),
    path(
        "stats/",
        AlertStatsAPIView.as_view(),
        name="alerts-stats",
    ),
]