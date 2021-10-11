from rest_framework import serializers
from .models import Room, UserInfo

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_key']


class UserInfoSerializer(serializers.ModelSerializer):

    # connected_room_key = serializers.ReadOnlyField(source='room.room_key')
    # connected_room_keys = []
    # for e in range(len(Room.objects.all())):
    #     connected_room_keys.append(Room.objects.all()[e])
    #     print(connected_room_keys[e])

    class Meta:
        model = UserInfo
        fields = ['connected_room_key', 'nickname', 'team']


    
    