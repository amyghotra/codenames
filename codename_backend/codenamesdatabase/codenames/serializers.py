<<<<<<< HEAD
from rest_framework import serializers
from .models import Room, UserInfo

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_key']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'room_key', 'nickname', 'team', 'task']


=======
from rest_framework import serializers
from .models import Room, UserInfo

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_key']


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInfo
        fields = ['connected_room_key', 'nickname', 'team', 'task']

>>>>>>> 5b3902550b8ba665d902e096c70315598e873b51
