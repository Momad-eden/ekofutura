from django.urls import path

from dashboard.api.views import (
    DashboardStatsAPIView,
)

urlpatterns = [
    path(
        "",
        DashboardStatsAPIView.as_view(),
        name="dashboard-stats",
    ),
]