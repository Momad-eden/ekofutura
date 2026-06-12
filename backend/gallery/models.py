from django.db import models


class GalleryItem(models.Model):

    MEDIA_TYPES = [
        ("IMAGE", "Image"),
        ("VIDEO", "Vidéo"),
        ("YOUTUBE", "YouTube"),
    ]

    CATEGORY_CHOICES = [
        ("EROSION", "Érosion côtière"),
        ("PLASTIC", "Pollution plastique"),
        ("EVENT", "Événement"),
        ("REPORTAGE", "Reportage"),
        ("BIODIVERSITY", "Biodiversité"),
        ("INTERVIEW", "Interview"),
        ("OTHER", "Autre"),
    ]

    title = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )

    media_type = models.CharField(
        max_length=20,
        choices=MEDIA_TYPES,
        default="IMAGE"
    )

    image = models.ImageField(
        upload_to="gallery/images/",
        blank=True,
        null=True
    )

    video = models.FileField(
        upload_to="gallery/videos/",
        blank=True,
        null=True
    )

    youtube_url = models.URLField(
        blank=True,
        null=True
    )

    thumbnail = models.ImageField(
        upload_to="gallery/thumbnails/",
        blank=True,
        null=True
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="OTHER"
    )

    published = models.BooleanField(
        default=True
    )

    featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title