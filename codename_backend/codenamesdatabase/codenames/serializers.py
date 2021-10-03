from rest_framework import serializers
from .models import Game, Room, UserInfo

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_key']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'room_key', 'nickname', 'team', 'task']


class GameSerializer(serializers.ModelSerializer):
    class meta:
        model = Game
        fields = ['id', 'room_key', ]