from django.contrib import admin
from .models import Alert


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):

    list_display = (
        "fullname",
        "category",
        "status",
        "created_at",
    )

    list_filter = (
        "category",
        "status",
    )

    search_fields = (
        "fullname",
        "description",
    )