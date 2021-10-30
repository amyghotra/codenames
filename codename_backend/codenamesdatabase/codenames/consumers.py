# ADDED FILE FOR DJANGO CHANNELS
# define ws consumer class here

import json
import asyncio
from channels.consumer import AsyncConsumer

class ClueBoxConsumer(AsyncConsumer):
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
        self.room_group_name = 'cluebox_%s' % self.room_name # starts with cluebox

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
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
        text_data_json = json.loads(front_text)
        count = text_data_json['count']
        clue = text_data_json['clue']
        # broadcasts the message
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "spymasterClue", # same as message defined below
                "count": count,
                "clue": clue,
            }
        )

    async def spymasterClue(self, event): # must be same as 'type': 'message', ~6 lines above
        """
        Receive a broadcast message and send it over a websocket
        """
        
        count = event['count']
        clue = event['clue']

        # Send message to WebSocket
        await self.send({
            'type': 'websocket.send',
            'count': count,
            'clue': clue,
        })