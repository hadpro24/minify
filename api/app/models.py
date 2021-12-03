import uuid
from django.db import models

# Create your models here.
class Film(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    released = models.DateField()
    description = models.TextField()
    runtime = models.DurationField()
    country = models.CharField(max_length=150)
    rated = models.DecimalField(max_digits=4, decimal_places=2)
    image = models.ImageField(upload_to='films')

    def __str__(self):
        return self.title
