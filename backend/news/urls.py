from django.urls import path

from news.api.views import (
    NewsListAPIView,
    NewsDetailAPIView,
)

urlpatterns = [
    path(
        "",
        NewsListAPIView.as_view(),
        name="news-list",
    ),

    path(
        "<slug:slug>/",
        NewsDetailAPIView.as_view(),
        name="news-detail",
    ),
]