# 🔧 Guide Technique - Améliorations Backend Django

**Guide complet pour améliorer le backend Django REST Framework d'EkoFutura**

---

## 📋 Table des matières

1. [Architecture & Structure](#1-architecture--structure)
2. [Modèles Étendus](#2-modèles-étendus)
3. [API Endpoints](#3-api-endpoints)
4. [Système de Modération](#4-système-de-modération)
5. [Emails & Notifications](#5-emails--notifications)
6. [Caching & Performance](#6-caching--performance)
7. [IA Integration](#7-ia-integration)

---

## 1. Architecture & Structure

### Structure Recommandée

```
backend/
├── ekofutura/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── reports/                    # App principale
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── permissions.py
│   ├── filters.py
│   ├── tasks.py               # Celery tasks
│   ├── services/              # Logique métier
│   │   ├── __init__.py
│   │   ├── moderation.py
│   │   ├── analytics.py
│   │   ├── notifications.py
│   │   └── ai_service.py
│   └── tests/
│       ├── test_models.py
│       ├── test_views.py
│       └── test_services.py
├── ai/                        # Module IA
│   ├── models.py
│   ├── vision.py
│   ├── nlp.py
│   └── prediction.py
├── users/                     # Profils simples (optionnel)
│   ├── models.py
│   └── serializers.py
├── requirements.txt
├── manage.py
├── .env.example
└── docker-compose.yml
```

### Settings Recommandés

```python
# ekofutura/settings.py

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.getenv('DB_NAME', 'ekofutura'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'ATOMIC_REQUESTS': True,
        'CONN_MAX_AGE': 600,
    }
}

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    },
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Celery
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# Cache
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://ekofutura.com",
]

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'noreply@ekofutura.com')

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'logs/django.log',
            'maxBytes': 1024 * 1024 * 10,  # 10MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
        'sentry': {
            'level': 'ERROR',
            'class': 'sentry_sdk.integrations.logging.EventHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'sentry'],
            'level': 'INFO',
            'propagate': True,
        },
        'reports': {
            'handlers': ['file'],
            'level': 'INFO',
        },
    },
}

# Sentry
import sentry_sdk
sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN'),
    environment=os.getenv('ENVIRONMENT', 'development'),
)
```

---

## 2. Modèles Étendus

### Modèle Report Complet

```python
# reports/models.py
from django.contrib.gis.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Q
import uuid

class Report(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Brouillon'),
        ('submitted', 'Soumis'),
        ('approved', 'Approuvé'),
        ('rejected', 'Rejeté'),
        ('resolved', 'Résolu'),
    ]

    CATEGORY_CHOICES = [
        ('pollution', 'Pollution'),
        ('déchets', 'Déchets'),
        ('eau', 'Eau'),
        ('air', 'Air'),
        ('érosion', 'Érosion'),
        ('inondation', 'Inondation'),
        ('autre', 'Autre'),
    ]

    SEVERITY_CHOICES = [
        ('low', 'Faible'),
        ('medium', 'Moyen'),
        ('high', 'Élevé'),
        ('critical', 'Critique'),
    ]

    # Identifiant unique
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Informations de base
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='medium')

    # Géolocalisation
    location = models.PointField(null=True, blank=True)
    latitude = models.FloatField(
        validators=[MinValueValidator(-90), MaxValueValidator(90)]
    )
    longitude = models.FloatField(
        validators=[MinValueValidator(-180), MaxValueValidator(180)]
    )
    location_name = models.CharField(max_length=255, blank=True)

    # Signalant (sans compte)
    reporter_name = models.CharField(max_length=200, blank=True)
    reporter_email = models.EmailField(blank=True)
    reporter_phone = models.CharField(max_length=20, blank=True)

    # Statut & modération
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='submitted'
    )
    credibility_score = models.FloatField(default=0.5, validators=[
        MinValueValidator(0), MaxValueValidator(1)
    ])
    is_spam = models.BooleanField(default=False)
    is_duplicate = models.BooleanField(default=False)
    duplicate_of = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='duplicates'
    )

    # IA & Metadata
    ai_suggested_category = models.CharField(max_length=50, blank=True)
    ai_confidence = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(1)
    ])
    detected_objects = models.JSONField(default=dict)  # Résultats YOLO

    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    # Statistiques
    views_count = models.IntegerField(default=0)
    helpful_count = models.IntegerField(default=0)
    not_helpful_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', '-created_at']),
            models.Index(fields=['status']),
            models.Index(fields=['latitude', 'longitude']),
            models.Index(fields=['is_spam', 'is_duplicate']),
        ]
        verbose_name_plural = 'Reports'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """Mettre à jour location depuis lat/long"""
        from django.contrib.gis.geos import Point
        if self.latitude and self.longitude:
            self.location = Point(self.longitude, self.latitude)
        super().save(*args, **kwargs)


class ReportPhoto(models.Model):
    """Galerie photos pour signalements"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='reports/%Y/%m/%d/')
    caption = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['uploaded_at']


class Moderation(models.Model):
    """Log de modération"""
    ACTION_CHOICES = [
        ('approve', 'Approuvé'),
        ('reject', 'Rejeté'),
        ('spam', 'Spam'),
        ('duplicate', 'Doublon'),
        ('comment', 'Commentaire'),
    ]

    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='moderations')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    reason = models.TextField()
    moderator_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


class Feedback(models.Model):
    """Retours utilisateurs sur signalements"""
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='feedback')
    is_helpful = models.BooleanField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('report', 'id')  # Eviter doublons
```

---

## 3. API Endpoints

### Serializers

```python
# reports/serializers.py
from rest_framework import serializers
from .models import Report, ReportPhoto, Moderation, Feedback

class ReportPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportPhoto
        fields = ['id', 'image', 'caption']


class ModerationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moderation
        fields = ['id', 'action', 'reason', 'moderator_name', 'created_at']


class ReportListSerializer(serializers.ModelSerializer):
    """Liste simple des signalements"""
    photos = ReportPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Report
        fields = [
            'id', 'title', 'category', 'severity', 'latitude', 'longitude',
            'credibility_score', 'created_at', 'photos', 'views_count'
        ]


class ReportDetailSerializer(serializers.ModelSerializer):
    """Détail complet du signalement"""
    photos = ReportPhotoSerializer(many=True, read_only=True)
    moderations = ModerationSerializer(many=True, read_only=True)

    class Meta:
        model = Report
        fields = '__all__'
        read_only_fields = [
            'id', 'location', 'status', 'credibility_score',
            'ai_suggested_category', 'ai_confidence', 'detected_objects',
            'views_count', 'created_at', 'updated_at'
        ]


class ReportCreateSerializer(serializers.ModelSerializer):
    """Création sans compte obligatoire"""
    photos = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=True,
        min_length=1,
        max_length=5
    )

    class Meta:
        model = Report
        fields = [
            'title', 'description', 'category', 'severity',
            'latitude', 'longitude', 'location_name',
            'reporter_name', 'reporter_email', 'reporter_phone',
            'photos'
        ]

    def create(self, validated_data):
        photos_data = validated_data.pop('photos', [])
        report = Report.objects.create(**validated_data)
        
        for photo in photos_data:
            ReportPhoto.objects.create(report=report, image=photo)
        
        return report
```

### ViewSets

```python
# reports/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from .models import Report, Feedback
from .serializers import (
    ReportListSerializer, ReportDetailSerializer,
    ReportCreateSerializer
)
from .services.moderation import check_spam, find_duplicates
from .services.analytics import generate_statistics


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'severity', 'status']
    search_fields = ['title', 'description', 'location_name']
    ordering_fields = ['created_at', 'views_count', 'credibility_score']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return ReportCreateSerializer
        elif self.action == 'retrieve':
            return ReportDetailSerializer
        return ReportListSerializer

    def create(self, request, *args, **kwargs):
        """Créer un signalement sans compte"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        report = serializer.save()

        # Vérifier spam
        if check_spam(report):
            report.is_spam = True
            report.status = 'rejected'
            report.save()

        # Chercher doublons
        duplicates = find_duplicates(report)
        if duplicates.exists():
            report.is_duplicate = True
            report.duplicate_of = duplicates.first()
            report.save()

        # Lancer analyse IA async
        from .tasks import analyze_report_images
        analyze_report_images.delay(str(report.id))

        return Response(
            ReportDetailSerializer(report).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approuver un signalement"""
        report = self.get_object()
        report.status = 'approved'
        report.approved_at = timezone.now()
        report.save()
        
        return Response({'status': 'approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Rejeter un signalement"""
        report = self.get_object()
        report.status = 'rejected'
        reason = request.data.get('reason', '')
        
        Moderation.objects.create(
            report=report,
            action='reject',
            reason=reason,
            moderator_name=request.user.username or 'auto'
        )
        report.save()
        
        return Response({'status': 'rejected'})

    @action(detail=True, methods=['post'])
    def feedback(self, request, pk=None):
        """Soumettre un retour (utile/pas utile)"""
        report = self.get_object()
        is_helpful = request.data.get('is_helpful', False)
        
        Feedback.objects.create(
            report=report,
            is_helpful=is_helpful,
            comment=request.data.get('comment', '')
        )

        if is_helpful:
            report.helpful_count += 1
        else:
            report.not_helpful_count += 1
        report.save()

        return Response({'status': 'feedback_recorded'})

    @method_decorator(cache_page(60 * 5))  # Cache 5 minutes
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Statistiques globales"""
        stats = {
            'total_reports': Report.objects.filter(status='approved').count(),
            'by_category': Report.objects.filter(status='approved')
                .values('category').annotate(count=Count('id')),
            'by_severity': Report.objects.filter(status='approved')
                .values('severity').annotate(count=Count('id')),
            'recent_reports': ReportListSerializer(
                Report.objects.filter(status='approved')[:10],
                many=True
            ).data,
            'average_credibility': Report.objects.filter(status='approved')
                .aggregate(Avg('credibility_score'))
        }
        return Response(stats)

    @action(detail=False, methods=['get'])
    def heatmap_data(self, request):
        """Données pour heatmap"""
        reports = Report.objects.filter(status='approved').values(
            'latitude', 'longitude', 'category'
        )
        
        return Response({
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [r['longitude'], r['latitude']]
                    },
                    'properties': {'category': r['category']}
                }
                for r in reports
            ]
        })
```

### URLs

```python
# reports/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'reports', views.ReportViewSet, basename='report')

urlpatterns = [
    path('', include(router.urls)),
]
```

---

## 4. Système de Modération

### Service Modération

```python
# reports/services/moderation.py
from django.db.models import Q
from difflib import SequenceMatcher
from ..models import Report

def check_spam(report: Report) -> bool:
    """Détection spam simple"""
    spam_keywords = ['viagra', 'casino', 'loan', 'buy now']
    
    text = f"{report.title} {report.description}".lower()
    
    for keyword in spam_keywords:
        if keyword in text:
            return True
    
    return False


def find_duplicates(report: Report, threshold=0.8):
    """Trouver doublons par similarité"""
    recent_reports = Report.objects.filter(
        category=report.category,
        created_at__gte=report.created_at - timedelta(days=7)
    ).exclude(id=report.id)

    duplicates = []
    
    for existing in recent_reports:
        similarity = SequenceMatcher(
            None,
            report.description.lower(),
            existing.description.lower()
        ).ratio()
        
        if similarity > threshold:
            duplicates.append(existing)

    return duplicates


def calculate_credibility_score(report: Report) -> float:
    """Calculer score crédibilité"""
    score = 0.5  # Base 50%
    
    # +10% si photos
    if report.photos.exists():
        score += 0.1
    
    # +10% si contact fourni
    if report.reporter_email or report.reporter_phone:
        score += 0.1
    
    # +5% par retour positif
    helpful_pct = (
        report.helpful_count / 
        (report.helpful_count + report.not_helpful_count + 1)
    )
    score += helpful_pct * 0.3
    
    # -20% si spam détecté
    if report.is_spam:
        score -= 0.2
    
    # -15% si doublon
    if report.is_duplicate:
        score -= 0.15

    return max(0, min(1, score))
```

---

## 5. Emails & Notifications

### Service Notifications

```python
# reports/services/notifications.py
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from ..models import Report

def send_confirmation_email(report: Report):
    """Email de confirmation au signalant"""
    if not report.reporter_email:
        return

    context = {
        'report_id': report.id,
        'title': report.title,
        'category': report.get_category_display(),
    }

    html_message = render_to_string('emails/report_confirmation.html', context)
    plain_message = strip_tags(html_message)

    send_mail(
        subject=f'Votre signalement a été reçu - EkoFutura',
        message=plain_message,
        from_email='noreply@ekofutura.com',
        recipient_list=[report.reporter_email],
        html_message=html_message,
        fail_silently=False,
    )


def send_approval_notification(report: Report):
    """Notifier approbation"""
    if not report.reporter_email:
        return

    send_mail(
        subject='Votre signalement a été approuvé! 🎉',
        message=f"""
        Merci! Votre signalement "{report.title}" 
        a été approuvé et est maintenant visible sur la carte.
        """,
        from_email='noreply@ekofutura.com',
        recipient_list=[report.reporter_email],
    )
```

### Celery Tasks

```python
# reports/tasks.py
from celery import shared_task
from django.core.mail import send_mail
from .models import Report
from .services.notifications import send_confirmation_email, send_approval_notification
from .services.ai_service import analyze_images_ml

@shared_task
def send_confirmation_email_task(report_id):
    """Envoyer email async"""
    try:
        report = Report.objects.get(id=report_id)
        send_confirmation_email(report)
    except Report.DoesNotExist:
        pass


@shared_task
def analyze_report_images(report_id):
    """Analyser images avec IA"""
    try:
        report = Report.objects.get(id=report_id)
        
        for photo in report.photos.all():
            results = analyze_images_ml(photo.image)
            
            report.ai_confidence = results['confidence']
            report.ai_suggested_category = results['category']
            report.detected_objects = results['objects']
            report.save()
            
    except Report.DoesNotExist:
        pass
```

---

## 6. Caching & Performance

### Cache Strategy

```python
# reports/caching.py
from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Report

@receiver(post_save, sender=Report)
@receiver(post_delete, sender=Report)
def clear_report_caches(sender, **kwargs):
    """Invalider cache quand report change"""
    cache.delete('reports_statistics')
    cache.delete('reports_heatmap')
    cache.delete('reports_recent')


def get_or_calculate_statistics():
    """Statistiques avec cache"""
    cached = cache.get('reports_statistics')
    
    if cached:
        return cached

    stats = {
        'total': Report.objects.filter(status='approved').count(),
        'by_category': dict(
            Report.objects.filter(status='approved')
            .values('category')
            .annotate(count=Count('id'))
            .values_list('category', 'count')
        ),
    }

    cache.set('reports_statistics', stats, 300)  # Cache 5 min
    return stats
```

---

## 7. IA Integration

### Service IA

```python
# reports/services/ai_service.py
from PIL import Image
import torch
from ultralytics import YOLO

# Charger modèle une fois
model = YOLO('yolov8n.pt')

def analyze_image_with_yolo(image_path: str) -> dict:
    """Analyser image avec YOLOv8"""
    try:
        img = Image.open(image_path)
        results = model(img)
        
        detections = []
        for r in results:
            for box in r.boxes:
                detections.append({
                    'class': model.names[int(box.cls)],
                    'confidence': float(box.conf),
                    'bbox': box.xyxy[0].tolist(),
                })
        
        return {
            'success': True,
            'objects': detections,
            'confidence': max([d['confidence'] for d in detections], default=0)
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}
```

---

## 📦 Dépendances à Ajouter

```txt
# requirements.txt

# Existing
Django==4.2
djangorestframework==3.14
django-cors-headers==4.2
psycopg2-binary==2.9
django-filter==23.2

# Database & Geospatial
django-extensions==3.2
GeoDjango  # Built-in with Django

# Task Queue
celery==5.3
redis==5.0
django-celery-beat==2.5

# Caching & Performance
django-redis==5.3
django-ratelimit==4.1

# API Documentation
drf-spectacular==0.26

# IA
torch==2.0
ultralytics==8.0  # YOLOv8
pillow==10.0
scikit-learn==1.3
spacy==3.6

# Monitoring
sentry-sdk==1.32

# Testing
pytest==7.4
pytest-django==4.5
factory-boy==3.3

# Production
gunicorn==21.2
whitenoise==6.5
```

---

<div align="center">

[Retour au README](../README.md) • [Guide Frontend](./TECHNICAL_FRONTEND.md)

</div>
