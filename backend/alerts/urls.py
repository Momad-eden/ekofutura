from django.urls import path

from alerts.api.views import (
    AlertListCreateAPIView,
)

urlpatterns = [
    path(
        "",
        AlertListCreateAPIView.as_view(),
        name="alerts-list-create",
    ),
]