# ADDED FILE FOR DJANGO CHANNELS
# defining web sockets, can be defined anywhere -- but put in own file
from django.urls import re_path
from .consumer import ClueBoxConsumer

ws_urlpatterns = [ # List for path function
    re_path(r'ws/(?P<room_name>\w+)/$', ClueBoxConsumer.as_asgi()),
    # list each consumer, each should have diff names
]