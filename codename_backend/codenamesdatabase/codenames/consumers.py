# ADDED FILE FOR DJANGO CHANNELS
# from channels.generic.websocket import WebsocketConsumer, AsyncConsumer, SyncConsumer
from channels.consumer import AsyncConsumer # newer version of the above line
# define ws consumer class here

import json
from asgiref.sync import async_to_sync

# New python import
import asyncio 
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
#from .models import ....

class WSConsumer(AsyncConsumer): # New
    async def websocket_connect(self, event):
        print("connected", event)
        await self.send({
            "type": "websocket.accept"
        })
        
        """
        Connect to room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_name = self.room_name.replace(' ', '_')
        self.room_group_name = 'checked_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        # async_to_sync(self.channel_layer.group_add)(
        #     self.room_group_name,
        #     self.channel_name
        # )

        #self.accept()

    async def websocket_disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def websocket_receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        UTC time is included so the client can display it in each user's local time
        """
        front_text = text_data.get('text', None)
        text_data_json = json.loads(front_text) # Check at 41:00
        card_number = text_data_json['card_number']
        checked = text_data_json['checked']
        # broadcasts the message
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "message", # same as message defined below
                "card_number": card_number,
                "checked": checked,
            }
        )
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name,
        #     {
        #         'type': 'message', # same as message defined below
        #         'card_number': card_number,
        #         'checked': checked,
        #     }
        # )

    async def message(self, event): # must be same as 'type': 'message', ~6 lines above
        """
        Receive a broadcast message and send it over a websocket
        """
        
        card_number = event['card_number']
        checked = event['checked']

        # Send message to WebSocket
        await self.send( { # text_data=json.dumps({
            'type': 'websocket.send',
            'card_number': card_number,
            'checked': checked,
        }) # }))

    # def message(self, event): # must be same as 'type': 'message', ~6 lines above
    #     """
    #     Receive a broadcast message and send it over a websocket
    #     """
        
    #     card_number = event['card_number']
    #     checked = event['checked']

    #     # Send message to WebSocket
    #     self.send(text_data=json.dumps({
    #         'card_number': card_number,
    #         'checked': checked,
    #     }))

    #@database_sync_to_async # Add this statement when taking from models.py
    # Must use 'await' keyword when calling these

# class WSConsumer(WebsocketConsumer): # Old
#     def connect(self):
#         """
#         Connect to room
#         Spaces are replaced like this: 'My new room' -> 'My_new_room'
#         """
        
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_name = self.room_name.replace(' ', '_')
#         self.room_group_name = 'checked_%s' % self.room_name

#         # Join room group
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         self.accept()

#     def disconnect(self, close_code):
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )
#     def receive(self, text_data):
#         """
#         Receive a message and broadcast it to a room group
#         UTC time is included so the client can display it in each user's local time
#         """
        
#         text_data_json = json.loads(text_data)
#         card_number = text_data_json['card_number']
#         checked = text_data_json["checked"]

#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name,
#             {
#                 'type': 'message', # same as message defined below
#                 'card_number': card_number,
#                 'checked': checked,
#             }
#         )

#     def message(self, event): # must be same as 'type': 'message', ~6 lines above
#         """
#         Receive a broadcast message and send it over a websocket
#         """
        
#         card_number = event['card_number']
#         checked = event['checked']

#         # Send message to WebSocket
#         self.send(text_data=json.dumps({
#             'card_number': card_number,
#             'checked': checked,
#         }))

# class WSConsumer2(WebsocketConsumer): # Making a second socket consumer # try AsyncConsumer?
#     def connect(self):
#         """
#         Connect to a chat room
#         Spaces are replaced like this: 'My new room' -> 'My_new_room'
#         """
        
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_name = self.room_name.replace(' ', '_')
#         self.room_group_name = 'chat_%s' % self.room_name

#         # Join room group
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         self.accept()

#     def disconnect(self, close_code):
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )
    
    # Really simple consumer example
    # def connect(self): # override this one method as a minimal example
    #     self.accept() # accept incoming connection from client/browser

    #     # Specific to this app: 
    #     for i in range(1000):
    #          self.send(json.dumps({'message': randint(100,200)}))
    #          # give message (has a rand int), pass to json dump, and use send
    #          sleep(1)

    # Chat room example
    # specific to this app
    # from random import randint
    # from time import sleep
    # def receive(self, text_data):
    #     """
    #     Receive a message and broadcast it to a room group
    #     UTC time is included so the client can display it in each user's local time
    #     """
        
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #     utc_time = datetime.datetime.now(datetime.timezone.utc)
    #     utc_time = utc_time.isoformat()

    #     async_to_sync(self.channel_layer.group_send)(
    #         self.room_group_name,
    #         {
    #             'type': 'chat_message',
    #             'message': message,
    #             'utc_time': utc_time,
    #         }
    #     )

    # def chat_message(self, event):
    #     """
    #     Receive a broadcast message and send it over a websocket
    #     """
        
    #     message = event['message']
    #     utc_time = event['utc_time']

    #     # Send message to WebSocket
    #     self.send(text_data=json.dumps({
    #         'message': message,
    #         'utc_time': utc_time,
    #     }))