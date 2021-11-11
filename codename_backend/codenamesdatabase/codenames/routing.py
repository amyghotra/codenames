# ADDED FILE FOR DJANGO CHANNELS
# defining web sockets, can be defined anywhere
from django.urls import path, re_path
from .consumers import ClueBoxConsumer, CheckBoxConsumer # import all consumers here

ws_urlpatterns = [ # List for path function
    re_path(r'ws/(?P<room_name>\w+)/$', ClueBoxConsumer.as_asgi()),
    re_path(r'ws2/(?P<room_name>\w+)/$', CheckBoxConsumer.as_asgi()), # Need to fix these link names up, they work tho
    # list each consumer, each should have diff names
]