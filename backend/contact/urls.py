from django.urls import path

from contact.api.views import (
    ContactMessageCreateAPIView,
)

urlpatterns = [
    path(
        "",
        ContactMessageCreateAPIView.as_view(),
        name="contact-create",
    ),
]