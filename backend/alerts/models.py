from django.db import models

from core.models import BaseModel


class Alert(BaseModel):

    STATUS_CHOICES = [
        ("PENDING", "En attente"),
        ("VALIDATED", "Validé"),
        ("REJECTED", "Rejeté"),
    ]

    CATEGORY_CHOICES = [
        ("PLASTIC", "Pollution plastique"),
        ("EROSION", "Érosion côtière"),
        ("WASTE", "Déchets sauvages"),
        ("FLOOD", "Inondation"),
        ("WATER", "Pollution de l'eau"),
        ("AIR", "Pollution de l'air"),
        ("OTHER", "Autre"),
    ]

    fullname = models.CharField(max_length=255)

    phone = models.CharField(max_length=50)

    email = models.EmailField(
        blank=True,
        null=True
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    description = models.TextField()

    photo = models.ImageField(
        upload_to="alerts/",
        blank=True,
        null=True
    )

    latitude = models.FloatField()

    longitude = models.FloatField()

    location_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    def __str__(self):
        return f"{self.fullname} - {self.category}"