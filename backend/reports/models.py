from django.db import models
from django.utils.text import slugify

from core.models import BaseModel


class Report(BaseModel):
    title = models.CharField(max_length=255)

    slug = models.SlugField(
        unique=True,
        blank=True
    )

    description = models.TextField()

    youtube_url = models.URLField()

    thumbnail = models.ImageField(
        upload_to="reports/",
        blank=True,
        null=True
    )

    published = models.BooleanField(
        default=False
    )

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title