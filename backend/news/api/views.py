from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)

from news.models import News
from news.api.serializers import NewsSerializer


class NewsListAPIView(ListAPIView):

    serializer_class = NewsSerializer

    def get_queryset(self):
        return (
            News.objects
            .filter(published=True)
            .order_by("-created_at")
        )


class NewsDetailAPIView(RetrieveAPIView):

    serializer_class = NewsSerializer

    lookup_field = "slug"

    def get_queryset(self):
        return News.objects.filter(
            published=True
        )