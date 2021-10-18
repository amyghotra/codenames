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

def number_default_function():
    return uuid.uuid4().hex[:5].upper()

class Game(models.Model):
    game_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    connected_room_key = models.CharField(
        max_length = 5,
        blank=True,
        editable=False,
        default=number_default_function
    )

    def __str__(self):
        return "This game in happening in room: " + str(self.connected_room_key)

class RedTeam(models.Model):
    red_team_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    red_team_score = models.IntegerField(default=0)
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='redTeamInfo')
    connected_room_key = models.ForeignKey(Room, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return str(self.red_team_id) + " " + str(self.red_team_score) + " " + str(self.game_id)

class BlueTeam(models.Model):
    blue_team_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    blue_team_score = models.IntegerField(default=0)
    game_id  = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='blue_team_info')
    connected_room_key = models.ForeignKey(Room, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return str(self.blue_team_id) + " " + str(self.blue_team_score) + " " + str(self.game_id)

class Players(models.Model):
    player_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    operative_screen_name = models.CharField(max_length=12)
    TEAM = (
        ('R', 'Red'),
        ('B', 'Blue'),
    )
    ROLE = (
        ('S', 'Spymaster'),
        ('O', 'Operative'),
    )
    team = models.CharField(max_length=1, choices=TEAM)
    role = models.CharField(max_length=1, choices=ROLE)
    room = models.CharField(max_length=5)
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='players')
    user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='user_info_id')

################################################# WORDS ########################################################

def words_number_default_function():
    return uuid.uuid4().hex[:20].upper()

class GuessedWords(models.Model):
    guessed_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE)
    word = models.CharField(64,max_length=64)

    def __str__(self):
        return str(self.word)

class BlueWords(models.Model):
    blue_words_id = models.CharField(
        primary_key=True,
        max_length = 20,
        blank=True,
        editable=False,
        default=words_number_default_function
    )
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='blueWords')
    word = models.CharField(64,max_length=64)

    def __str__(self):
        return str(self.word)

class RedWords(models.Model):
    red_words_id = models.CharField(
        primary_key=True,
        max_length = 20,
        blank=True,
        editable=False,
        default=words_number_default_function
    )
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='redWords')
    word = models.CharField(64,max_length=64)

    def __str__(self):
        return str(self.word)

class DoubleAgentWords(models.Model):
    doubleagent_words_id = models.CharField(
        primary_key=True,
        max_length = 20,
        blank=True,
        editable=False,
        default=words_number_default_function
    )
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='doubleAgentWords')
    word = models.CharField(64, max_length=64)

    def __str__(self):
        return str(self.word)

class BystanderWords(models.Model):
    bystander_words_id = models.CharField(
        primary_key=True,
        max_length = 20,
        blank=True,
        editable=False,
        default=words_number_default_function
    )
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='bystanderWords')
    word = models.CharField(64,max_length=64)

    def __str__(self):
        return str(self.word)

class AssassinWords(models.Model):
    assassin_words_id = models.CharField(
        primary_key=True,
        max_length = 20,
        blank=True,
        editable=False,
        default=words_number_default_function
    )
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='assassinWords')
    word = models.CharField(64, max_length=64)

    def __str__(self):
        return str(self.word)

class GameWords(models.Model):
    word_id = models.CharField(
        primary_key=True,
        max_length = 20,
        blank=True,
        editable=False,
        default=words_number_default_function
    )
    game_id = models.ForeignKey('Game',on_delete=models.CASCADE, related_name='gameWords')
    guessed = models.BooleanField(default=False)
    word  = models.CharField(64, max_length=64)
    category = models.CharField(64, max_length=2)
    
    