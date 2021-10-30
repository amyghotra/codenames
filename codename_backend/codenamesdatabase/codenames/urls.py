from django.urls import path
from django.views.generic.base import View
from . import views

urlpatterns = [
    path('codenames/', views.RoomList.as_view()),
    path('codenames/userInfo', views.UserInfoList.as_view()),
    path('codenames/games', views.GameList.as_view()),
    path('codenames/redTeam', views.RedTeamList.as_view()),
    path('codenames/blueTeam', views.BlueTeamList.as_view()),
    path('codenames/players', views.PlayersList.as_view({'get': 'list'})),
    path('codenames/games/<str:game_id>', views.GameDetail.as_view()),
    path('codenames/games/word/<str:word_id>', views.WordsDetail.as_view()),
    path('codenames/redTeam/<str:red_team_id>', views.RedTeamDetail.as_view()),
    path('codenames/blueTeam/<str:blue_team_id>', views.BlueTeamDetail.as_view()),
    path('<str:room_name>/', views.room, name='room'), # Added for channels, again not sure if needed
]

