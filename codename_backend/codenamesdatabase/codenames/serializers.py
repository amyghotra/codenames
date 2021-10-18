from rest_framework import serializers
from .models import Room, UserInfo, Game, RedTeam, BlueTeam, Players, RedWords, BlueWords, BystanderWords, AssassinWords
from rest_framework.response import Response
from django.utils.crypto import get_random_string
import random
import csv

###################################### WORDS #############################################

def redWordsData(game, words):
    for i in range(len(words)):
        redWord = RedWords.objects.create(word=words[i], game_id=game)
        redWord.save()
        print(redWord.word)

def blueWordsData(game, words):
    for i in range(len(words)):
        blueWord = BlueWords.objects.create(word=words[i], game_id=game)
        blueWord.save()
        # print(blueWord)

def bystanderWordsData(game, words):
    for i in range(len(words)):
        bystanderWord = BystanderWords.objects.create(word=words[i], game_id=game)
        bystanderWord.save()
        # print(bystanderWord)

def assassinWordsData(game, words):
    assassinWord = AssassinWords.objects.create(word=words, game_id=game)
    assassinWord.save()
    # print(assassinWord)

# def redTeamCreation(game):
#     redTeam = RedTeam.objects.create(game=game)
#     redTeam.save()

# def blueTeamCreation(game):
#     blueTeam = BlueTeam.objects.create(game=game)
#     blueTeam.save()

def getGameWords():
    allWords = set()
    with open('/mnt/c/Users/rimsh/Desktop/CapstoneProject/codenames/codename_backend/codenamesdatabase/codenames/words.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            allWords.add(', '.join(row))

    game_words = set()

    while(len(game_words) < 25):
        randWord = random.choice(tuple(allWords))
        game_words.add(randWord)

    return list(game_words)

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = "__all__"


    def create(self, validated_data):
        gameSession = Game.objects.create(**validated_data)
        allWordsForGame = getGameWords()
        redWordsData(gameSession, allWordsForGame[0:8])
        blueWordsData(gameSession, allWordsForGame[8:16])
        bystanderWordsData(gameSession, allWordsForGame[16:24])
        assassinWordsData(gameSession, allWordsForGame[24])
        print('game is in session! ', gameSession)
        # redTeamCreation(game)
        # blueTeamCreation(game)
        gameSession.save() 
        return gameSession

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



