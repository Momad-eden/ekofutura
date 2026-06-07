from rest_framework.generics import ListAPIView

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