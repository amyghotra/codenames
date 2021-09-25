from django.urls import path
from . import views

urlpatterns = [
    path('codenames/', views.RoomList.as_view()),
    path('codenames/userInfo', views.UserInfoList.as_view()),
]