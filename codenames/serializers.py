from rest_framework import serializers
from .models import Room, UserInfo, Game, RedTeam, BlueTeam, Players, RedWords, BlueWords, DoubleAgentWords, BystanderWords, AssassinWords, GameWords
from rest_framework.response import Response
from django.utils.crypto import get_random_string
import random
import csv
import os

###################################### WORDS #############################################

def getGameWords():
    print("trying to get words for the game")
    allWords = set()
    with open( os.path.dirname(os.path.realpath(__file__)) + '/words.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            allWords.add(', '.join(row))

    game_words = set()

    while(len(game_words) < 25):
        randWord = random.choice(tuple(allWords))
        game_words.add(randWord)

    return list(game_words)

class RedWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RedWords
        fields = "__all__"

class BlueWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlueWords
        fields = "__all__"

class DoubleAgentWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoubleAgentWords
        fields = "__all__"

class BystanderWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BystanderWords
        fields = "__all__"

class AssassinWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssassinWords
        fields = "__all__"

class WordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameWords
        fields = "__all__"

class GameSerializer(serializers.ModelSerializer):
    gameWords = WordsSerializer(many=True, read_only=True)

    def create(self, validated_data):
        words_data = getGameWords()
        game = Game.objects.create(**validated_data)
        
        options = ['R','B','C','D','A']
        redTotal = 8
        blueTotal = 8
        civTotal = 7
        doubleTotal = 1
        assassinTotal = 1
        total = 0
        
        while total < 25:
            classfication = random.choice(options)
            
            if classfication == 'R' && redTotal > 0:
                GameWords.objects.create(game_id=game, word=gameWords[total], category='R')
                redTotal -= 1
                total += 1
            elif classfication == 'B' && blueTotal > 0:
                GameWords.objects.create(game_id=game, word=gameWords[total], category='B')
                blueTotal -= 1
                total += 1
            elif classfication == 'C' && civTotal > 0:
                GameWords.objects.create(game_id=game, word=gameWords[total], category='C')
                civTotal -= 1
                total += 1
            elif classfication == 'D' && doubleTotal > 0:
                GameWords.objects.create(game_id=game, word=gameWords[total], category='D')
                doubleTotal -= 1
                total += 1
            elif classfication == 'A' && assassinTotal > 0:
                GameWords.objects.create(game_id=game, word=gameWords[total], category='A')
                assassinTotal -= 1
                total += 1

        return game

    class Meta:
        model = Game
        fields = ['game_id', 'connected_room_key', 'gameWords']

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



