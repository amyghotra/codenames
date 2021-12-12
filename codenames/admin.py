from django.contrib import admin
from .models import Room, UserInfo, Game, RedTeam, BlueTeam, Players

# Register your models here.
admin.site.register(Room)
admin.site.register(UserInfo)
admin.site.register(Game)
admin.site.register(RedTeam)
admin.site.register(BlueTeam)
admin.site.register(Players)
