# ADDED FILE FOR DJANGO CHANNELS
# defining web sockets, can be defined anywhere
from django.urls import path, re_path
from .consumers import ClueBoxConsumer, TeamPointsConsumer, PlayersConsumer #, CheckBoxConsumer # import all consumers here

ws_urlpatterns = [ # List for path function
    re_path(r'ws/(?P<room_name>\w+)/$', ClueBoxConsumer.as_asgi()),
    re_path(r'teampoints/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', TeamPointsConsumer.as_asgi()),
    re_path(r'players/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', PlayersConsumer.as_asgi())
]