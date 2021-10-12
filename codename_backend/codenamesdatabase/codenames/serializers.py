from rest_framework import serializers
from .models import Room, UserInfo, Game

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_key']


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInfo
        fields = ['connected_room_key', 'nickname', 'team', 'task']

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = ['game_id', 'connected_room_key']