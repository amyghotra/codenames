from django.db import models

# Create your models here.
class Room(models.Model):
    room_key = models.CharField(max_length=5)


class UserInfo(models.Model):
    room_key = models.CharField(max_length=5)
    TEAM = (
        ('R', 'Red'),
        ('B', 'Blue'),
    )
    nickname = models.CharField(max_length=12)
    team = models.CharField(max_length=1, choices=TEAM)