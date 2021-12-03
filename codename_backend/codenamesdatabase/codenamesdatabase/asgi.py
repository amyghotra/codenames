"""
ASGI config for codenamesdatabase project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
import django
from django.core.asgi import get_asgi_application

from channels.auth import AuthMiddlewareStack # ADD THIS for channels
from channels.routing import URLRouter # ADD THIS for channels
from channels.routing import ProtocolTypeRouter # ADD THIS for channels
from channels.routing import get_default_application
from codenames.routing import ws_urlpatterns # ADD THIS, comes from codenames, import ws definition


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codenamesdatabase.settings')
django.setup() # Added from new tutorial
application = get_asgi_application()

application = ProtocolTypeRouter({ # Added for channels
    'http': get_asgi_application(), # gets the http value from get_asgi_
    'websocket': AuthMiddlewareStack(URLRouter(ws_urlpatterns)) # ADD THIS second key, adds a websocket instance
    # if connection is http it goes to get_asgi_...
    # if connection is a websocket, it goes to AuthM...
})