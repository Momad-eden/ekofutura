from django.urls import path

from partners.api.views import (
    PartnerListAPIView,
)

urlpatterns = [
    path(
        "",
        PartnerListAPIView.as_view(),
        name="partners-list",
    ),
]