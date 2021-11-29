# ADDED FILE FOR DJANGO CHANNELS
# defining web sockets, can be defined anywhere
from django.urls import path, re_path
from .consumers import ClueBoxConsumer, CheckBoxConsumer, DoubleAgentConsumer, TeamPointsConsumer, PlayersConsumer, TurnConsumer #, CheckBoxConsumer # import all consumers here

ws_urlpatterns = [ # List for path function
    re_path(r'cluebox/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', ClueBoxConsumer.as_asgi()),
    re_path(r'checkbox/(?P<type_name>\w+)/(?P<card_number>\w+)/(?P<gameid>(\w|-)+)/$', CheckBoxConsumer.as_asgi()),
    re_path(r'doubleagent/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', DoubleAgentConsumer.as_asgi()),
    re_path(r'teampoints/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', TeamPointsConsumer.as_asgi()),
    re_path(r'players/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', PlayersConsumer.as_asgi()),
    re_path(r'turns/(?P<room_name>(\w|-)+)/$', TurnConsumer.as_asgi()),
]