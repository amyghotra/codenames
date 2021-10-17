from rest_framework import serializers
from .models import Room, UserInfo, Game, RedTeam, BlueTeam, Players, RedWords, BlueWords, BystanderWords, AssassinWords, GameWords
from rest_framework.response import Response
from django.utils.crypto import get_random_string
import random
import csv

###################################### WORDS #############################################

def getGameWords():
    print("trying to get words for the game")
    allWords = set()
    with open('/Users/amyghotra/Desktop/codenames/codename_backend/codenamesdatabase/words.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            allWords.add(', '.join(row))

    game_words = set()

    while(len(game_words) < 25):
        randWord = random.choice(tuple(allWords))
        game_words.add(randWord)

    return list(game_words)

class RedWordsSerilizer(serializers.ModelSerializer):
    class Meta:
        model = RedWords
        fields = "__all__"

class BlueWordsSerilizer(serializers.ModelSerializer):
    class Meta:
        model = BlueWords
        fields = "__all__"

class BystanderWordsSerilizer(serializers.ModelSerializer):
    class Meta:
        model = BystanderWords
        fields = "__all__"

class AssassinWordsSerilizer(serializers.ModelSerializer):
    class Meta:
        model = AssassinWords
        fields = "__all__"

class GameSerializer(serializers.ModelSerializer):

    redWords = RedWordsSerilizer(many=True, read_only=True)
    blueWords = BlueWordsSerilizer(many=True, read_only=True)
    bystanderWords = BystanderWordsSerilizer(many=True, read_only=True)
    assassinWords = AssassinWordsSerilizer(many=True, read_only=True)

    def create(self, validated_data):
        words_data = getGameWords()
        game = Game.objects.create(**validated_data)
        for word in words_data[0:8]:
            RedWords.objects.create(game_id=game, word=word)
        for word in words_data[8:16]:
            BlueWords.objects.create(game_id=game, word=word)
        for word in words_data[16:24]:
            BystanderWords.objects.create(game_id=game, word=word)
        AssassinWords.objects.create(game_id=game, word=words_data[24])
        return game

    class Meta:
        model = Game
        fields = ('game_id','connected_room_key','redWords','blueWords','bystanderWords','assassinWords')


############################################# NON WORDS SERIALIZERS #################################################

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_key']


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInfo
        fields = ['id', 'connected_room_key', 'nickname', 'team', 'task']

class RedTeamSerializer(serializers.ModelSerializer):

    class Meta: 
        model = RedTeam
        fields = ['red_team_id', 'red_team_score', 'game_id', 'connected_room_key']

class BlueTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlueTeam
        fields = ['blue_team_id', 'blue_team_score', 'game_id', 'connected_room_key']

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Players
        fields = "__all__"
    
    def get(self, request):
        room = Players.objects.all()
        serializer = PlayerSerializer(room, many=True)
        return Response(serializer.data) 

    def create(self, validated_data):
        return Players.objects.create(**validated_data)



