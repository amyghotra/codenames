# ADDED FILE FOR DJANGO CHANNELS
# define ws consumer class here

import json
from asgiref.sync import async_to_sync 
from channels.generic.websocket import WebsocketConsumer 

class ClueBoxConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        # Get the type of websocket that we called it in routing
        self.type_name = self.scope['url_route']['kwargs']['type_name']
        self.type_name = self.type_name.replace(' ', '_')
        # Get the game id for each game being played
        self.gameid = self.scope['url_route']['kwargs']['gameid']
        self.gameid = self.gameid.replace(' ', '_')
        # Create the full group name
        self.room_group_name = 'cluebox_' + self.type_name + '_' + self.gameid 
        # each consumer needs their own separate name
        # add in game code to the room group here so it creates different channels for each room

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        print("added to clue group ", self.room_group_name)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
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



# Consumer for sending messages through checkboxes
class CheckBoxConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        # Get the type of websocket that we called it in routing
        self.type_name = self.scope['url_route']['kwargs']['type_name']
        self.type_name = self.type_name.replace(' ', '_')
        # Get the card number of this exact set so only corresponding cards will communicate
        self.card_number = self.scope['url_route']['kwargs']['card_number']
        self.card_number = self.card_number.replace(' ', '_')
        # Get the game id for each game being played
        self.gameid = self.scope['url_route']['kwargs']['gameid']
        self.gameid = self.gameid.replace(' ', '_')
        # Create the full group name
        self.room_group_name = 'checkbox_' + self.type_name + '_' + self.card_number + '_' + self.gameid
        # each consumer needs their own separate name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        print("added to check group ", self.room_group_name)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
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



# Consumer for updating the Double Agent
class DoubleAgentConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        # Get the type of websocket that we called it in routing
        self.type_name = self.scope['url_route']['kwargs']['type_name']
        self.type_name = self.type_name.replace(' ', '_')
        # Get the game id for each game being played
        self.gameid = self.scope['url_route']['kwargs']['gameid']
        self.gameid = self.gameid.replace(' ', '_')
        # Create the full group name
        self.room_group_name = 'doubleagent_' + self.type_name + '_' + self.gameid
        # each consumer needs their own separate name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        print("added to double agent group ", self.room_group_name)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        """   
        text_data_json = json.loads(text_data)
        print(text_data_json)
        team = text_data_json['team']
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "doubleAgentReveal", # same as message defined below
                "team": team,
            }
        )

    def doubleAgentReveal(self, event): # must be same as 'type': 'doubleAgentReveal', ~6 lines above
        """
        Receive a broadcast message and send it over a websocket
        """
    
        team = event['team']

        self.send(text_data=json.dumps({
            'team': team,
        }))

        print("sent double agent") # Each instance of the socket should print this out