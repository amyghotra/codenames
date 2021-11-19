# ADDED FILE FOR DJANGO CHANNELS
# defining web sockets, can be defined anywhere
from django.urls import path, re_path
from .consumers import ClueBoxConsumer, CheckBoxConsumer, DoubleAgentConsumer # import all consumers here

ws_urlpatterns = [ # List for path function
    # list each consumer, each should have diff names
    re_path(r'cluebox/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', ClueBoxConsumer.as_asgi()),
    re_path(r'checkbox/(?P<type_name>\w+)/(?P<card_number>\w+)/(?P<gameid>(\w|-)+)/$', CheckBoxConsumer.as_asgi()),
    re_path(r'doubleagent/(?P<type_name>\w+)/(?P<gameid>(\w|-)+)/$', DoubleAgentConsumer.as_asgi()),
]