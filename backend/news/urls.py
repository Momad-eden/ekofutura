from django.urls import path

from news.api.views import NewsListAPIView

urlpatterns = [
    path(
        "",
        NewsListAPIView.as_view(),
        name="news-list"
    ),
]