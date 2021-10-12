from django.db import models
import uuid

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

class Game(models.Model):
    game_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    connected_room_key = models.ForeignKey(Room, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return "This game in happening in room " + str(self.connected_room_key)

class RedTeam(models.Model):
    red_team_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    red_team_score = models.IntegerField(default=0)
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='redTeamInfo')

    def __str__(self):
        return self.red_team_id + " " + self.red_team_score + " " + self.game_id

class BlueTeam(models.Model):
    blue_team_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    blue_team_score = models.IntegerField()
    game_id  = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='blue_team_info')

