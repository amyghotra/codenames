from django.urls import re_path
from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [ 
    re_path(r'^ws/game/(?P<room_name>)', consumers.SpymasterClueBox.as_asgi()),
]