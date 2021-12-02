import React, {Component} from 'react'
import './Game.css'
import axios from 'axios'
import SpymastersGame from './Spymasters/SpymastersGame.js'
import OperativesGame from './Operatives/OperativesGame.js'


class Game extends Component {
    constructor() {
        super()
        this.state = {
            room_key: '',
            roomid: '',
            nickname: '',
            team: '',
            playerid: '',
            task: '',
            red_score: 0,
            blue_score: 0,
            gameid: '',
            gameData: '', 
            gameWords: '',
            doubleAgent: '',
            doubleAgentIndex: '',
            playersdata: '',
            agentClicked: false,

            redteamid: '',
            blueteamid: '',
            
            loadedPlayers: false,
            //Websocket Team Points
            wstp: null,
            //Websocket Players
            wsp: null,
            //WebSocket Double Agent
            doubleAgentWS: '',

            // WebSocket turns
            ws_turn: null,
            currentTeam: 'R',
            currentPlayer: null,

            wsClue: null,

            blueOperatives: [],
            bIndex: 0,
            redOperatives: [],
            rIndex: 0,

            wantedFirst: 'R'
        }
    }

    componentDidMount = async () => {

        let gameWords = this.props.location.state.gameWords;
        for(let i = 0; i < gameWords.length; i++) {
            if(gameWords[i].category === 'D') {
                this.setState({
                    doubleAgent: gameWords[i],
                    doubleAgentIndex: i
                })
            }
        }

        await axios.get('http://127.0.0.1:8000/codenames/players').then(res => {
            this.setState({
                playersdata: res.data
            })
            let playerExist = false;
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === this.props.location.state.gameid && res.data[i].room === this.props.location.state.room_key && res.data[i].user_id === this.props.location.state.playerid) {
                    playerExist = true;
                }
            }

            if(playerExist === false) {
                axios.post('http://127.0.0.1:8000/codenames/players', {
                    operative_screen_name: this.props.location.state.nickname,
                    team: this.props.location.state.team,
                    role: this.props.location.state.task,
                    room: this.props.location.state.room_key,
                    game_id: this.props.location.state.gameid,
                    user_id: this.props.location.state.playerid
                }).then(response => {

                    if(this.props.location.state.team === 'B' && this.props.location.state.task === 'O') {
                        console.log("new blue operative")
                        this.setState({
                            blueOperatives: [...this.state.blueOperatives, response.data]
                        })
                    } else if(this.props.location.state.team === 'R' && this.props.location.state.task === 'O') {
                        console.log("new red operative")
                        this.setState({
                            redOperatives: [...this.state.redOperatives, response.data]
                        })
                    }

                    this.setState({
                        playersdata: [...this.state.playersdata, response.data],
                    })
                })
            }
        })
        
        this.setState({
            room_key: this.props.location.state.room_key,
            roomid: this.props.location.state.roomid,
            nickname: this.props.location.state.nickname,
            team: this.props.location.state.team,
            task: this.props.location.state.task,
            gameid: this.props.location.state.gameid,
            gameData: this.props.location.state.gameData,
            gameWords: this.props.location.state.gameWords,
            playerid: this.props.location.state.playerid,
            redteamid: this.props.location.state.redteamid,
            blueteamid: this.props.location.state.blueteamid,
        })

        this.updateGameWords(this.props.location.state.gameid)
        this.connectTurns()

        await axios.get(`http://127.0.0.1:8000/codenames/redTeam/${this.state.redteamid}`)
        .then(response => {
            this.setState({
                red_score:response.data.red_team_score
            })
        })
        await axios.get(`http://127.0.0.1:8000/codenames/blueTeam/${this.state.blueteamid}`)
        .then(response => {
            this.setState({
                blue_score:response.data.blue_team_score
            })
        })

        const localRedTeamId = localStorage.getItem(this.state.redteamid);
        const localBlueTeamId = localStorage.getItem(this.state.blueteamid);

        if(localRedTeamId && localBlueTeamId) {
            // console.log(localRedTeamId, localBlueTeamId);
            this.setState({
                red_score: Number(localRedTeamId),
                blue_score: Number(localBlueTeamId)
            })
        }

        this.connectTeamPoints();
        this.connectPlayers();
        this.connectDoubleAgent();
        if(this.state.currentPlayer === null) {
            console.log("trying to set initial player")
            this.setIntial()
        } else {
            console.log("was already set")
            console.log(this.state.currentPlayer)
            console.log(this.state.currentTeam)
            console.log("was already set")
        }
        this.connectClue()
        // this.setIntial()

    }

    componentDidUpdate = (prevProps, prevState) => {

        if(this.state.wsp && this.state.wsp.readyState === 1 && this.state.loadedPlayers === false) {
            console.log('the ready state is working', this.state.playersdata[this.state.playersdata.length-1])
            this.socketSendPlayers(this.state.playersdata[this.state.playersdata.length-1]);
            this.setState({
                loadedPlayers: true
            })
        }
    }

    setIntial = () => {

        var player;
        var team;
        
        if(this.state.wantedFirst === 'B' && this.state.blueOperatives.length > 0) {
            player = this.state.blueOperatives[this.state.bIndex].player_id
            team = 'B'
            var bIdx = this.state.bIndex + 1
            this.setState({bIndex: bIdx})
        } else if(this.state.wantedFirst === 'R') {
            console.log("red team wanted first")
            console.log(this.state.redOperatives)
            if(this.state.redOperatives.length == 0) {
                player = {
                    operative_screen_name: this.props.location.state.nickname,
                    team: this.props.location.state.team,
                    role: this.props.location.state.task,
                    room: this.props.location.state.room_key,
                    game_id: this.props.location.state.gameid,
                    user_id: this.props.location.state.playerid
                }
            } else {
                player = this.state.redOperatives[this.state.rIndex].player_id
            }
            team = 'R'
            var rIdx = this.state.rIndex + 1
            this.setState({rIndex: rIdx})
        }
        this.state.ws_turn.onopen = () => {
            console.log("line 187 -- ws open")
            this.updateRoundPlayer(team, player, this.state.rIndex, this.state.bIndex)
            this.setState({
                currentPlayer: player,
                currentTeam: team
            })
        }
    }

    connectTurns = () => {
        var ws_turn = new WebSocket('ws://localhost:8000/turns/turns/' + this.state.gameid + '/');
        let that = this; //cache the this
        var connectInterval;

        //websocket onopen event listener
        ws_turn.onopen = () => {
            // console.log('connect team points component');
            this.setState({ ws_turn: ws_turn });

            that.timeout = 250;
            clearTimeout(connectInterval);
        }

        ws_turn.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.checkTurns, Math.min(1000, that.timeout));
        }

        // websocket onerror event listener
        ws_turn.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws_turn.close();
        };

        ws_turn.onmessage = evt => {
            // listen to data sent from the websocket server
            const data = JSON.parse(evt.data)
            console.log(data)
            console.log("tryeng to print event out")
            console.log(evt)
            // console.log("received clue!")
            let nextPlayingTeam = data.nextTeam
            let nextUser= data.nextPlayer
            this.setState({
                currentTeam: nextPlayingTeam,
                currentPlayer: nextUser
            })
            console.log("start printing out ws on message stuff")
            console.log(nextPlayingTeam)
            console.log(nextUser)
            console.log(this.state.currentTeam)
            console.log(this.state.currentPlayer)
            console.log("finished printing out ws on message stuff")
        };
        this.setState(prevState => {
            return {
                ws_turn: ws_turn
            }
        })
    }
    
    setDoubleAgent = () => {
        let doubleAgent = { ...this.state.doubleAgent}; 
        doubleAgent.category = this.state.team;
        let agentClicked = this.state.agentClicked;
        agentClicked = true;
        this.setState({
            doubleAgent,
            agentClicked
        })

        axios.put(`http://127.0.0.1:8000/codenames/games/word/${this.state.doubleAgent.word_id}`, doubleAgent)
            .then(res => {
                console.log(res)
                this.updateGameWords(this.state.gameid)
            })

        var data = {
            "number": this.state.doubleAgentIndex,
            "team": this.state.team
        }
        this.state.doubleAgentWS.send(JSON.stringify(data)) // send to channel
        console.log(data)
    }

    updateGameWords = (gameid) => {
        axios.get(`http://127.0.0.1:8000/codenames/games/${gameid}`).then(res => {
            this.setState({ 
                gameWords: res.data.gameWords 
            })
        
        })
    }

    //from the card component, the words id and its corresponding team will be sent here to increase the points and change the guess to true accordingly
    increaseTeamPoints = (team, word) => {
        let redPoints = this.state.red_score
        let bluePoints = this.state.blue_score
        if(team === 'R'){
            let wordObj = this.state.gameWords.find(w => w.word_id === word);
            if(wordObj.guessed === false) {
                this.setState(prevState => {
                    return {
                        red_score: prevState.red_score+1,
                    }
                })
                redPoints += 1
    
                localStorage.setItem(this.state.redteamid, JSON.stringify(redPoints));

                axios.patch(`http://127.0.0.1:8000/codenames/games/word/${word}`, {guessed:true}).then(response => {
                    console.log(response.data)
                })
                axios.patch(`http://127.0.0.1:8000/codenames/redTeam/${this.state.redteamid}`, {red_team_score: redPoints}).then(response => {
                    console.log(response.data)
                })
            }
            
            this.socketSendTeamPoints(redPoints, bluePoints);
            // this.socketSendPlayers(this.state.playersdata[this.state.playersdata.length-1]);
        }
        else if(team === 'B'){
            let wordObj = this.state.gameWords.find(w => w.word_id === word);
            if(wordObj.guessed === false) {
                this.setState(prevState => {
                    return {
                        blue_score: prevState.blue_score+1,
                    }
                })
                bluePoints += 1

                localStorage.setItem(this.state.blueteamid, JSON.stringify(bluePoints));

                axios.patch(`http://127.0.0.1:8000/codenames/games/word/${word}`, {guessed:true}).then(response => {
                    console.log(response.data)
                })
                axios.patch(`http://127.0.0.1:8000/codenames/blueTeam/${this.state.blueteamid}`, {blue_team_score: bluePoints}).then(response => {
                    console.log(response.data)
                })

            }
            this.socketSendTeamPoints(redPoints, bluePoints);
        }
        if(team !== this.state.currentTeam) {
            this.endRoundEarly()
        }

    }

    socketSendTeamPoints = (red_team_points, blue_team_points) => {
        var data = {
            "red_team_points": red_team_points,
            "blue_team_points": blue_team_points
        }

        this.state.wstp.send(JSON.stringify(data))
        // console.log(data)
    }

    connectTeamPoints = () => {
        var wstp = new WebSocket('ws://localhost:8000/teampoints/teampoints/' + this.state.gameid + '/');
        let that = this; //cache the this
        var connectInterval;

        //websocket onopen event listener
        wstp.onopen = () => {
            // console.log('connect team points component');
            this.setState({ wstp: wstp });

            that.timeout = 250;
            clearTimeout(connectInterval);
        }

        wstp.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.checkTeamPoints, Math.min(1000, that.timeout));
        }

        // websocket onerror event listener
        wstp.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            wstp.close();
        };

        wstp.onmessage = evt => {
            // listen to data sent from the websocket server
            const data = JSON.parse(evt.data)
            console.log(data)
            // console.log("received clue!")
            let red_team_points = data.red_team_points
            let blue_team_points = data.blue_team_points
            this.setState(prevState => {
                return {
                    red_score: red_team_points,
                    blue_score: blue_team_points
                }
            })
        };
        this.setState(prevState => {
            return {
                wstp: wstp
            }
        })
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    checkTeamPoints = () => {
        const { wstp } = this.state.wstp;
        if (!wstp || wstp.readyState === WebSocket.CLOSED) this.connectTeamPoints(); //check if websocket instance is closed, if so call `connect` function.
    };

    checkTurns = () => {
        const { ws_turn } = this.state.ws_turn;
        if (!ws_turn || ws_turn.readyState === WebSocket.CLOSED) this.connectTurns(); //check if websocket instance is closed, if so call `connect` function.
    };

    sendTurns = (team, player) => {

        console.log("sendturns")
        console.log(player)
        console.log(team)
        console.log(player)
        console.log("sendturns")
        if(player !== null){
            this.state.ws_turn.send(JSON.stringify({
                'nextTeam': team,
                'nextPlayer': player
            }))
        }
        
    }

    updateRoundPlayer = (team, player, redIndex, blueIndex) => {
        this.setState({
            currentPlayer: player,
            currentTeam: team,
            rIndex: redIndex,
            bIndex: blueIndex
        })
        this.sendTurns(team, player)
        // this.clueSocketSend()
    }

    endRoundEarly = () => {
        var team;
        var player;
        var blueIndex = this.state.bIndex
        var redIndex = this.state.rIndex

        if(this.state.currentTeam === 'R') {
            team = 'B'
            console.log("tryig to fetch a blue player")
            console.log(this.state.blueOperatives.length)
            player = this.state.blueOperatives[blueIndex]
            blueIndex += 1
            if(blueIndex === this.state.blueOperatives.length) {blueIndex = 0}

            this.updateRoundPlayer(team, player, redIndex, blueIndex)
            
        } else if(this.state.currentTeam === 'B') {
            team = 'R'
            console.log("tryig to fetch a red player")
            console.log(this.state.redOperatives.length)
            player = this.state.redOperatives[redIndex]
            redIndex += 1
            if(redIndex === this.state.redOperatives.length) {redIndex = 0}

            this.updateRoundPlayer(team, player, redIndex, blueIndex)
        }
    }
    
    socketSendPlayers = (player) => {
        var data = {
            "new_players": player
        }
        this.state.wsp.send(JSON.stringify(data))
        
    }

    connectPlayers = () => {
        var wsp = new WebSocket('ws://localhost:8000/players/players/' + this.state.gameid + '/');
        let that = this;
        var connectInterval;

        wsp.onopen = () => {
            this.setState ({ wsp: wsp });

            that.timeout = 250;
            clearTimeout(connectInterval);
        };

        wsp.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        }

        wsp.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            wsp.close();
        };

        wsp.onmessage = evt => {
            const data = JSON.parse(evt.data)
            let new_players = data.new_players

            if(!this.state.playersdata.includes(new_players)) {
                let playersData = this.state.playersdata;
                playersData.push(new_players);
                this.setState({
                    playersdata: playersData
                })
            }
            
            // console.log('THIS IS THE NEWEST PLAYERS ,PLEASE SHOW ', new_players)
        };

        this.setState(prevState => {
            return {
                wsp: wsp
            }
        })

    };

    checkPlayers = () => {
        const { wsp } = this.state.wsp;
        if(!wsp || wsp.readyState === WebSocket.CLOSED) this.connectPlayers();
    }

    connectClue = () => {
        var wsClue = new WebSocket('ws://localhost:8000/cluebox/cluebox/' + this.props.gameid + '/');
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        wsClue.onopen = () => {
            console.log("connected websocket main component");
            this.setState({ wsClue: wsClue });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        wsClue.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.checkClueSocket, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        wsClue.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            wsClue.close();
        };

        wsClue.onmessage = evt => {
            // listen to data sent from the websocket server
            const data = JSON.parse(evt.data)
            console.log(data)
            console.log("received clue!")
            let count = data.count
            let clue = data.clue
            this.setState(prevState => {
                return {
                    spymasterClueCount: count,
                    spymasterClueWord: clue
                }
            })
        };
        this.setState(prevState => {
            return {
                wsClue: wsClue
            }
        })
    };
    
    checkClueSocket = () => {
        const { wsClue } = this.state.wsClue;
        if (!wsClue || wsClue.readyState === WebSocket.CLOSED) this.connectClue(); //check if websocket instance is closed, if so call `connect` function.
    };

    clueSocketSend = () => {
        var data = {
            "count": 0,
            "clue": "Waiting..."
        }
        this.state.wsClue.send(JSON.stringify(data)) // send to channel
        console.log(data)
    }

    /**
     * @function connectDoubleAgent
     * This function establishes the connect with the websocket and also ensures 
     * constant reconnection if connection closes
     */
     connectDoubleAgent = () => {
        var ws = new WebSocket('ws://localhost:8000/doubleagent/doubleagent/' + this.state.gameid + '/');
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            this.setState({ doubleAgentWS: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const data = JSON.parse(evt.data)
            console.log(data)
            console.log("received clue!")
            let team = data.team

            let doubleAgent = { ...this.state.doubleAgent}; 
            doubleAgent.category = team;

            this.setState(prevState => {
                return {
                    // Add
                    agentClicked: true, // Make it so the I WANT FIRST goes away
                    doubleAgent: doubleAgent

                }
            })
            this.updateGameWords(this.state.gameid)
        };
        this.setState(prevState => {
            return {
                doubleAgentWS: ws
            }
        })
    };

    render() {
        
        return(
            <div>
                {

                    this.state.task === 'S' ?   
                    
                    <div>
                        {
                        this.state.agentClicked === false ?
                        <div>
                            <button onClick={this.setDoubleAgent}>I WANT FIRST</button> 
                            <SpymastersGame 
                                room_key = {this.state.room_key}
                                gameWords = {this.state.gameWords}
                                increaseTeamPoints = {this.increaseTeamPoints}
                                redPoints = {this.state.red_score}
                                bluePoints = {this.state.blue_score}
                                playersdata = {this.state.playersdata}
                                gameid = {this.state.gameid}
                                myTeam = {this.state.team}
                                currentTeam = {this.state.currentTeam}
                                currentPlayer = {this.state.currentPlayer}
                            />
                        </div>

                        :

                        <div>
                            <SpymastersGame 
                                room_key = {this.state.room_key}
                                gameWords = {this.state.gameWords}
                                increaseTeamPoints = {this.increaseTeamPoints}
                                redPoints = {this.state.red_score}
                                bluePoints = {this.state.blue_score}
                                playersdata = {this.state.playersdata}
                                gameid = {this.state.gameid}
                                currentTeam = {this.state.currentTeam}
                                currentPlayer = {this.state.currentPlayer}
                            />
                        </div>
                        }
                    </div>
                    : 

                    <OperativesGame 
                        room_key = {this.state.room_key}
                        gameWords = {this.state.gameWords}
                        gameid = {this.state.gameid}
                        increaseTeamPoints = {this.increaseTeamPoints}
                        redPoints = {this.state.red_score}
                        bluePoints = {this.state.blue_score}
                        playersdata = {this.state.playersdata}
                        gameid = {this.state.gameid}
                        currentTeam = {this.state.currentTeam}
                        currentPlayer = {this.state.currentPlayer}
                        updateRoundPlayer = {this.updateRoundPlayer}
                        playerid = {this.state.playerid}
                        playerTeam = {this.state.team}
                        bIndex = {this.state.bIndex}
                        rIndex = {this.state.rIndex}
                    />
                }
            </div>
        )
    }
}

export default Game