import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer

class SpymasterClueBox(WebsocketConsumer):

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'clue_%s' % self.room_name

        # Join room group
        async_to_sync (self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        ))
        # self.reply_channel.send({"accept": True})
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        ))

    def receive(self, text_data):
        print("just received some data")
        print(text_data)
        text_data_json = json.loads(text_data)
        clueWord = text_data_json['clue']
        clueCount = text_data_json['count']

        # Send message to room group
        async_to_sync( self.channel_layer.group_send (
            self.room_group_name,
            {
                "type": "clueInfo",
                'clueWord': clueWord,
                'clueCount': clueCount
            }
        ))

    # Receive message from room group
    def clueInfo(self, event):
        print("clueinfo func")
        clueCount = event['count']
        clueWord = event['clue']

        # Send message to WebSocket
        async_to_sync (self.send(text_data=json.dumps({
            'clueWord': clueWord,
            'clueCount': clueCount
        })))

        print("clue information was sent")