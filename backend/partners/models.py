from django.db import models

from core.models import BaseModel


class Partner(BaseModel):

    name = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )

    logo = models.ImageField(
        upload_to="partners/"
    )

    website = models.URLField(
        blank=True
    )

    active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.name