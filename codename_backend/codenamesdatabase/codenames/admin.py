from django.contrib import admin
from .models import Room, UserInfo, Game

# Register your models here.
admin.site.register(Room)
admin.site.register(UserInfo)
admin.site.register(Game)