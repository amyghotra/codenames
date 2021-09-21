from django.db import models

# Create your models here.
class Room(models.Model):
    room_key = models.CharField(max_length=8)