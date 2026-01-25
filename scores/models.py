from django.db import models

# Create your models here.
class Sendscore(models.Model):
    username = models.CharField(max_length=255)
    score = models.FloatField()


def __str__(self):
    return f"{self.username} - {self.score}"


