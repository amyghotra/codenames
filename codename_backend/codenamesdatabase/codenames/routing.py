# ADDED FILE FOR DJANGO CHANNELS
# defining web sockets, can be defined anywhere -- but put in own file
from django.urls import path, re_path
from .consumers import WSConsumer #, WSConsumer2 # Need consumers.py model, import all consumers here

ws_urlpatterns = [ # List for path function
    re_path(r'ws/(?P<room_name>\w+)/$', WSConsumer.as_asgi()),
    #re_path(r'(?P<room_name>\w+)/$', WSConsumer.as_asgi()), # need the .as_asgi()
    # <room_name> is going to be used in consumer's self.scope['url_route]['kwargs']['room_name']
    # re_path(r'ws/(?P<room_name>\w+)2/$', WSConsumer2.as_asgi()), # trying a new way # take away second consumer
    # path('ws/some_url/', WSConsumer.as_asgi()), # django channels - views = consumers
    # path('ws/some_url2/', WSConsumer2.as_asgi()) # try adding a second one?
]