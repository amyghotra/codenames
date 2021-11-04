# ADDED FILE FOR DJANGO CHANNELS
# define ws consumer class here

import json
#import asyncio # can remove
from asgiref.sync import async_to_sync # New 
#from channels.consumer import AsyncConsumer # Can remove
from channels.generic.websocket import WebsocketConsumer 

class ClueBoxConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_name = self.room_name.replace(' ', '_')
        self.room_group_name = 'clue_%s' % self.room_name # each consumer needs their own separate name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        print("added to clue group")

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        UTC time is included so the client can display it in each user's local time
        """   
        text_data_json = json.loads(text_data)
        print(text_data_json)
        count = text_data_json['count']
        clue = text_data_json['clue']
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "spymasterClue", # same as message defined below
                "count": count,
                "clue": clue,
            }
        )

    def spymasterClue(self, event): # must be same as 'type': 'spymasterClue', ~6 lines above
        """
        Receive a broadcast message and send it over a websocket
        """
        
        count = event['count']
        clue = event['clue']

        self.send(text_data=json.dumps({
            'count': count,
            'clue': clue,
        }))

        print("sent clue") # Each instance of the socket should print this out



class CheckBoxConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_name = self.room_name.replace(' ', '_')
        self.room_group_name = 'check_%s' % self.room_name # each consumer needs their own separate name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        print("added to check group")

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        UTC time is included so the client can display it in each user's local time
        """   
        text_data_json = json.loads(text_data)
        print(text_data_json)
        number = text_data_json['number']
        checked = text_data_json['checked']
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "checkboxReveal", # same as message defined below
                "number": number,
                "checked": checked,
            }
        )

    def checkboxReveal(self, event): # must be same as 'type': 'checkboxReveal', ~6 lines above
        """
        Receive a broadcast message and send it over a websocket
        """
        
        number = event['number']
        checked = event['checked']

        self.send(text_data=json.dumps({
            'number': number,
            'checked': checked,
        }))

        print("sent check") # Each instance of the socket should print this out

# Not working use the above, may have to do with using Websocket() in react, maybe theres an Async counterpart in React
# class ClueBoxConsumer(AsyncConsumer): 
#     async def websocket_connect(self, event):
#         print("connected", event)
#         await self.send({
#             "type": "websocket.accept"
#         })
        
#         """
#         Connect to room
#         Spaces are replaced like this: 'My new room' -> 'My_new_room'
#         """
        
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_name = self.room_name.replace(' ', '_')
#         self.room_group_name = 'cluebox_%s' % self.room_name # starts with cluebox

#         # Join room group
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         print("added to group")

#     async def websocket_disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )
#     async def websocket_receive(self, text_data):
#         """
#         Receive a message and broadcast it to a room group
#         UTC time is included so the client can display it in each user's local time
#         """
#         print("receive", self)
#         front_text = text_data.get('text', None)
#         text_data_json = json.loads(front_text)
#         print(text_data_json)
#         count = text_data_json['count']
#         clue = text_data_json['clue']

#         # broadcasts the message
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 "type": "spymasterClue", # same as message defined below
#                 "count": count,
#                 "clue": clue,
#             }
#         )

#     async def spymasterClue(self, event): # must be same as 'type': 'spymasterClue', ~6 lines above
#         """
#         Receive a broadcast message and send it over a websocket
#         """
        
#         count = event['count']
#         clue = event['clue']
        
#         # Send message to WebSocket
#         await self.send({
#             'type': "websocket.send",
#             'count': count,
#             'clue': clue,
#         })

#         # await self.send(text_data=json.dumps({
#         #     'count': count,
#         #     'clue': clue,
#         # }))

#         print("test") # Each instance of the socket should print this out