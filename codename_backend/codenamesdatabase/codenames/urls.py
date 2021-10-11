from django.urls import path
from django.views.generic.base import View
from . import views

urlpatterns = [
    path('codenames/', views.RoomList.as_view()),
    path('codenames/userInfo', views.UserInfoList.as_view()),

    
]