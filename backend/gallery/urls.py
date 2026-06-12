from django.urls import path

from gallery.api.views import (
    GalleryListAPIView,
)

urlpatterns = [
    path(
        "",
        GalleryListAPIView.as_view(),
        name="gallery-list",
    ),
]