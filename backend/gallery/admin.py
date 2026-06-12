from django.contrib import admin
from django.utils.html import format_html

from .models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):

    list_display = (
        "preview",
        "title",
        "media_type",
        "category",
        "featured",
        "published",
        "created_at",
    )

    list_filter = (
        "media_type",
        "category",
        "featured",
        "published",
    )

    search_fields = (
        "title",
        "description",
    )

    list_editable = (
        "featured",
        "published",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "image_preview",
    )

    fieldsets = (
        (
            "Informations",
            {
                "fields": (
                    "title",
                    "description",
                    "category",
                    "media_type",
                )
            },
        ),
        (
            "Média",
            {
                "fields": (
                    "image",
                    "video",
                    "youtube_url",
                    "thumbnail",
                    "image_preview",
                )
            },
        ),
        (
            "Publication",
            {
                "fields": (
                    "featured",
                    "published",
                )
            },
        ),
        (
            "Dates",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    def preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" width="70" style="border-radius:8px;" />',
                obj.thumbnail.url,
            )

        if obj.image:
            return format_html(
                '<img src="{}" width="70" style="border-radius:8px;" />',
                obj.image.url,
            )

        return "-"

    preview.short_description = "Aperçu"

    def image_preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" width="300" style="border-radius:12px;" />',
                obj.thumbnail.url,
            )

        if obj.image:
            return format_html(
                '<img src="{}" width="300" style="border-radius:12px;" />',
                obj.image.url,
            )

        return "Aucun aperçu disponible"

    image_preview.short_description = "Prévisualisation"