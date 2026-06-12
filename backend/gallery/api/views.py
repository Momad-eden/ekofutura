from django.db.models import Q

from rest_framework.generics import ListAPIView

from gallery.models import GalleryItem

from .serializers import GalleryItemSerializer


class GalleryListAPIView(ListAPIView):

    serializer_class = GalleryItemSerializer

    def get_queryset(self):

        queryset = (
            GalleryItem.objects
            .filter(published=True)
            .order_by("-created_at")
        )

        category = self.request.GET.get(
            "category"
        )

        media_type = self.request.GET.get(
            "media_type"
        )

        featured = self.request.GET.get(
            "featured"
        )

        search = self.request.GET.get(
            "search"
        )

        if category:
            queryset = queryset.filter(
                category=category
            )

        if media_type:
            queryset = queryset.filter(
                media_type=media_type
            )

        if featured == "true":
            queryset = queryset.filter(
                featured=True
            )

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
                |
                Q(description__icontains=search)
            )

        return queryset