from django.urls import path
from django.views.generic.base import View
from . import views

urlpatterns = [
    path('codenames/', views.RoomList.as_view()),
    path('codenames/userInfo', views.UserInfoList.as_view()),
    path('codenames/games', views.GameList.as_view()),
    path('codenames/redTeam', views.RedTeamList.as_view()),
    path('codenames/blueTeam', views.BlueTeamList.as_view()),
    path('codenames/players', views.PlayersList.as_view({'get': 'list'}))
]