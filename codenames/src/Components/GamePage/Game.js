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
            wsp: null
        }
    }

    



    componentDidMount = async () =>{
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
                }).then(response =>{
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
    
    setDoubleAgent = () => {
        let doubleAgent = { ...this.state.doubleAgent}; 
        doubleAgent.category = this.state.team;
        let agentClicked = this.state.agentClicked;
        agentClicked = true;
        this.setState({
            doubleAgent,
            agentClicked
        })

        // localStorage.setItem(this.state.gameid, agentClicked)
        

        axios.put(`http://127.0.0.1:8000/codenames/games/word/${this.state.doubleAgent.word_id}`, doubleAgent)
            .then(res => {
                console.log(res)
                this.updateGameWords(this.state.gameid)
            })
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
    
    socketSendPlayers = (player) => {
        var data = {
            "new_players": player
        }
        this.state.wsp.send(JSON.stringify(data))
        
        // console.log('this is the incoming players data', data);
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

    render() {
        
        return(
            <div>
                {

                    this.state.task === 'S' ?
                    
                    
                    <SpymastersGame 
                        doubleAgent ={this.state.doubleAgent}
                        doubleAgentIndex = {this.state.doubleAgentIndex}
                        setDoubleAgent = {this.setDoubleAgent}
                        room_key = {this.state.room_key}
                        gameWords = {this.state.gameWords}
                        increaseTeamPoints = {this.increaseTeamPoints}
                        redPoints = {this.state.red_score}
                        bluePoints = {this.state.blue_score}
                        playersdata = {this.state.playersdata}
                        gameid = {this.state.gameid}
                    />
                    : 

                    <OperativesGame 
                        doubleAgent ={this.state.doubleAgent}
                        doubleAgentIndex = {this.state.doubleAgentIndex}
                        room_key = {this.state.room_key}
                        gameWords = {this.state.gameWords}
                        gameid = {this.state.gameid}
                        increaseTeamPoints = {this.increaseTeamPoints}
                        redPoints = {this.state.red_score}
                        bluePoints = {this.state.blue_score}
                        playersdata = {this.state.playersdata}
                    />
                }
            </div>
        )
    }
}

export default Game