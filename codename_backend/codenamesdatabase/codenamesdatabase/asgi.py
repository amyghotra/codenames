# # mysite/asgi.py
# import os

# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application
# import codenames.routing
# from django.conf.urls import url
# from channels.auth import AuthMiddlewareStack
# # import codenames.consumers.SpymasterClueBox

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codenamesdatabase.settings')

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             codenames.routing.websocket_urlpatterns
#         )
#     ),
#     # "http": get_asgi_application(),
#     # "websocket": AuthMiddlewareStack(
#     #     URLRouter(
#     #         codenames.routing.websocket_urlpatterns
#     #     )
#     # ),
# })

import os
import django
from django.core.asgi import get_asgi_application

from channels.auth import AuthMiddlewareStack # ADD THIS for channels
from channels.routing import URLRouter # ADD THIS for channels
from channels.routing import ProtocolTypeRouter # ADD THIS for channels
from channels.routing import get_default_application
from codenames.routing import websocket_urlpatterns # ADD THIS, comes from codenames, import ws definition


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codenamesdatabase.settings')
django.setup() # Added from new tutorial
application = get_asgi_application()

application = ProtocolTypeRouter({ # Added for channelss
    'http': get_asgi_application(), # gets the http value from getasgi
    'websocket': AuthMiddlewareStack(URLRouter(websocket_urlpatterns)) # ADD THIS second key, adds a websocket instance
    # if connection is http it goes to getasgi...
    # if connection is a websocket, it goes to AuthM...
})