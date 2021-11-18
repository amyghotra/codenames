# mysite/asgi.py
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import codenames.routing
from django.conf.urls import url
from channels.auth import AuthMiddlewareStack
# import codenames.consumers.SpymasterClueBox

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codenamesdatabase.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            codenames.routing.websocket_urlpatterns
        )
    ),
    # "http": get_asgi_application(),
    # "websocket": AuthMiddlewareStack(
    #     URLRouter(
    #         codenames.routing.websocket_urlpatterns
    #     )
    # ),
})