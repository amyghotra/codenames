from django.shortcuts import render
from .models import Room, UserInfo, Game, GameWords, RedTeam, BlueTeam, Players
from .serializers import RoomSerializer, UserInfoSerializer, GameSerializer, WordsSerializer, RedTeamSerializer, BlueTeamSerializer, PlayerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.http import Http404

# Create your views here.
class RoomList(APIView):

    def get(self, request):
        room = Room.objects.all()
        serializer = RoomSerializer(room, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoList(APIView):
    def get(self, request):
        userInfo = UserInfo.objects.all()
        serializer = UserInfoSerializer(userInfo, many=True)
        return Response(serializer.data)

    def post(self, request):
        # print('this is the request ', request.data, ' this is self ', self)
        room_key = request.data.get('connected_room_key')
        room_key_id = ''
        for i in Room.objects.all(): 
            if str(room_key) == str(i.room_key):
                room_key_id = i.id
                request.data.update({'connected_room_key': room_key_id})

        serializer = UserInfoSerializer(data=request.data)

        # print(serializer.initial_data, 'deez nutz', request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WordsList(APIView):

    def get(self, request):
        words = GameWords.objects.all()
        serializer = WordsSerializer(words, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WordsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WordsDetail(APIView):

    def get_word(self, word_id):
        try:
            return GameWords.objects.get(word_id=word_id)
        except GameWords.DoesNotExist:
            raise Http404

    def get(self, request, word_id):
        word = self.get_word(word_id)
        serializer = WordsSerializer(word)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request, word_id):
        word = self.get_word(word_id)
        serializer = WordsSerializer(word, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, word_id):
        word = self.get_word(word_id)
        serializer = WordsSerializer(word)
        word.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, word_id):
        word = self.get_word(word_id)
        serializer = WordsSerializer(word, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class GameList(APIView):

    def get(self, request):
        game = Game.objects.all()
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data)

    def post(self, request):
        room_key = request.data.get('connected_room_key')
        room_key_id = ''
        for i in Room.objects.all():
            if str(room_key) == str(i.room_key):
                room_key_id = i.id
                request.data.update({'connected_room_key': room_key_id})

        serializer = GameSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GameDetail(APIView):

    def get_game(self, game_id):
        try:
            return Game.objects.get(game_id=game_id)
        except Game.DoesNotExist:
            raise Http404

    def get(self, request, game_id):
        game = self.get_game(game_id)
        serializer = GameSerializer(game)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request, game_id):
        game = self.get_game(game_id)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, game_id):
        game = self.get_game(game_id)
        serializer = GameSerializer(game)
        game.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)

class RedTeamList(APIView):

    def get(self, request):
        redteam = RedTeam.objects.all()
        serializer = RedTeamSerializer(redteam, many=True)
        return Response(serializer.data)

    def post(self, request):        
        serializer = RedTeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlueTeamList(APIView):

    def get(self, request):
        blueteam = BlueTeam.objects.all()
        serializer = BlueTeamSerializer(blueteam, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BlueTeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PlayersList(viewsets.ModelViewSet):
    queryset = Players.objects.all()
    serializer_class=PlayerSerializer

    def get(self, request):
        players = Players.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
