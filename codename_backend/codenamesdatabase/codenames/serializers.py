from rest_framework import serializers
from .models import Room, UserInfo, Game, RedTeam, BlueTeam

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

class RedTeamSerializer(serializers.ModelSerializer):

    class Meta: 
        model = RedTeam
        field = ['red_team_id', 'red_team_score', 'game_id']

class BlueTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlueTeam
        field = ['blue_team_id', 'blue_team_score', 'game_id']