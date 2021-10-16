from django.db import models

# Create your models here.
class Room(models.Model):
    room_key = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.room_key

class UserInfo(models.Model):
    connected_room_key = models.ForeignKey(Room, on_delete=models.CASCADE, default=None)
    TEAM = (
        ('R', 'Red'),
        ('B', 'Blue'),
    )
    nickname = models.CharField(max_length=12)
    team = models.CharField(max_length=1, choices=TEAM)
    TASK = (
        ('S', 'Spymaster'),
        ('O', 'Operator')
    )
    task = models.CharField(max_length=1, choices=TASK)

    def __str__(self):
        return str(self.nickname) + " from " + str(self.connected_room_key)
