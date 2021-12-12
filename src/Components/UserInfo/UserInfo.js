import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './UserInfo.css'


class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            room_key: '',
            roomid: '',
            nickname: '',
            playerid: '',
            team: '',
            redteamid: '',
            blueteamid: '',
            task: '',
            redirect: false,
            gameData: '',
            gameWords: '',
            gameid: 0,
            connected_room_key: '',
            redTeamExist: false,
            blueTeamExist: false,

            redTeamSpyMaster: false,
            blueTeamSpyMaster: false,
            userinfoWS: null,
        }
    }

    componentDidMount = () => {
        //for when the user is joining a room that already exist   
        this.setState({
            room_key: this.props.location.state.room_key,
            roomid: this.props.location.state.roomid
        })

        //set all the existing games to state
        axios.get('http://127.0.0.1:8000/codenames/games').then(res => {
            this.setState({
                gamesData: res.data
            })
            this.renderGameId(this.props.location.state.roomid)
        })
        if (this.state.userinfoWS === null) {
            this.connectUserInfo()
        }
    }

    //make the game as long as the roomid exist and if there isnt a game that matches the roomid already
    renderGameId = (roomid) => {

        let roomidexist = false;

        axios.get('http://127.0.0.1:8000/codenames/games').then(res => {
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].connected_room_key === roomid) {
                    roomidexist = true;
                    this.setState({
                        gameid: res.data[i].game_id,
                        gameWords: res.data[i].gameWords
                    })
                    this.renderTeamId(res.data[i].game_id)
                }
            }
            if(roomidexist === false) {
                axios.post('http://127.0.0.1:8000/codenames/games', {
                    connected_room_key: roomid
                }).then(res => {
                    // console.log('this is the game data: ', res.data);
                    this.setState({
                        gameid: res.data.game_id,
                        gameData: res.data,
                        gameWords: res.data.gameWords,
                        connected_room_key: res.data.connected_room_key
                    })
                    // console.log('WE JUST MADE THIS GAME ID: ', res.data.game_id);
                    this.renderTeamId(res.data.game_id)
                })
            }
            axios.get('http://127.0.0.1:8000/codenames/players').then(response => {
                for(let i = 0; i < response.data.length; i++) {
                    if(response.data[i].game_id === this.state.gameid) {
                        console.log(response.data[i]);
                        if(response.data[i].team === "R" && response.data[i].role === "S") {
                            this.setState({redTeamSpyMaster: true})
                        }
                        if(response.data[i].team === "B" && response.data[i].role === "S") {
                            this.setState({blueTeamSpyMaster: true})
                        }
                    }
                }
            })
        })
    }

    renderTeamId = (gameid) => {
        // console.log('double checking ', gameid);

        axios.get('http://127.0.0.1:8000/codenames/redTeam').then(res => {
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === gameid) {
                    // console.log(res.data[i].game_id, ' COMPARED TO ', gameid)
                    this.setState({
                        redteamid: res.data[i].red_team_id,
                        redTeamExist: true,
                        
                    })
                }
            }
        })

        axios.get('http://127.0.0.1:8000/codenames/blueTeam').then(res => {
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === gameid) {
                    this.setState({
                        blueteamid: res.data[i].blue_team_id,
                        blueTeamExist: true,
                        
                    })
                }
            }
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setRed = () => {
        this.setState({
            team: 'R'
        })
    }

    setBlue = () => {
        this.setState({
            team: 'B'
        })
    }
 
    submitUserInfo = () => {        
        if(this.state.room_key !== null && this.state.nickname.length > 0 && this.state.team !== null && this.state.task !== null) {
            if((this.state.team === 'R' && this.state.task === 'S' && this.state.redTeamSpyMaster === false) || 
               (this.state.team === 'B' && this.state.task === 'S' && this.state.blueTeamSpyMaster === false) || 
               (this.state.task === 'O')) {
                // Socket send here if task is S 
                if (this.state.task === 'S') {
                    if (this.state.team === 'R') {
                        this.setState(prevState => {
                            return {
                                redTeamSpyMaster: true
                            }
                        })
                    }
                    else if (this.state.team === 'B') {
                        this.setState(prevState => {
                            return {
                                blueTeamSpyMaster: true
                            }
                        })
                    }
                    var data = {
                        "spymasterTeam": this.state.team,
                        "exists": true
                    }
                    this.state.userinfoWS.send(JSON.stringify(data)) // send to channel
                    // console.log(data)
                }
                axios.post('http://127.0.0.1:8000/codenames/userInfo', {
                    connected_room_key:this.props.location.state.room_key,
                    nickname: this.state.nickname, 
                    team: this.state.team,
                    task: this.state.task
                })
                .then(response => {
                    this.setState({
                        playerid: response.data.id
                    })
                    this.createGame()
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }


    createGame = async () => {
        if (this.state.redTeamExist === false) {
            await axios.post('http://127.0.0.1:8000/codenames/redTeam', {
                game_id: this.state.gameid,
                connected_room_key: this.state.roomid
            }).then(response => {
                this.setState({
                    redteamid: response.data.red_team_id
                })
                
            })
            .catch(error => {
                console.log(error)
            }) 
        }
        if (this.state.blueTeamExist === false) {
            await axios.post('http://127.0.0.1:8000/codenames/blueTeam', {
                game_id: this.state.gameid,
                connected_room_key: this.state.roomid
            }).then(response => {
                this.setState({
                    blueteamid: response.data.blue_team_id
                })
                
            })
            .catch(error => {
                console.log(error)
            })
        }

        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/game',
                state: {
                    room_key: this.state.room_key,
                    roomid: this.state.roomid,
                    nickname: this.state.nickname,
                    team: this.state.team,
                    task: this.state.task,
                    gameid: this.state.gameid,
                    gameData: this.state.gameData,
                    gameWords: this.state.gameWords,
                    playerid: this.state.playerid,
                    redteamid: this.state.redteamid,
                    blueteamid: this.state.blueteamid
                    
                }
            }}/>
        }
    }

    setSpy = () => {
        this.setState({
            task: 'S'
        })
    }

    setOper = () => {
        this.setState({
            task: 'O'
        })
    }

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures 
     * constant reconnection if connection closes
     */
     connectUserInfo = () => {
         // Using roomid instead of game id because that doesn't exist yet
        var ws = new WebSocket(`ws://codenames21.herokuapp.com/userinfo/userinfo/` + this.props.location.state.roomid + '/');
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            this.setState({ userinfoWS: ws });

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
            // console.log(data)
            // console.log("received clue!")
            let spymasterTeam = data.spymasterTeam
            let exists = data.exists
            if (spymasterTeam === 'R' && this.state.redTeamSpyMaster !== exists) {
                if (this.state.team === spymasterTeam) {
                    this.setState(prevState => {
                        return {
                            redTeamSpyMaster: exists,
                            task: 'O' // Another gameview claimed S on this team already
                        }
                    })
                }
                else {
                    this.setState(prevState => {
                        return {
                            redTeamSpyMaster: exists
                        }
                    })
                }
            }
            else if (spymasterTeam === 'B' && this.state.blueTeamSpyMaster !== exists) {
                if (this.state.team === spymasterTeam) {
                    this.setState(prevState => {
                        return {
                            blueTeamSpyMaster: exists,
                            task: 'O'
                        }
                    })
                }
                else {
                    this.setState(prevState => {
                        return {
                            blueTeamSpyMaster: exists
                        }
                    })
                }
            }
        };
        this.setState(prevState => {
            return {
                userinfoWS: ws
            }
        })
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    checkUserInfo = () => {
        const { ws } = this.state.ws;
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connectUserInfo(); //check if websocket instance is closed, if so call `connect` function.
    };

    
    render() {

        // const text = this.state.blue_team ? "blue team" : "red Team"
        
        return(
            <div className="userInfo">
                <br />
                <h6 className="gameCode"> Game Code: {this.state.room_key} </h6>
                <form className="container">
                    <div className="box-userName">
                        <label className="prompt">Enter nickname</label><br/><br/>
                        <input 
                        className="nickname" 
                        value={this.state.nickname}
                        name= "nickname"
                        type="text" 
                        placeholder="Nickname" 
                        spellCheck="false" 
                        onChange={this.handleChange}/><br/>

                    </div>
                    <div className="box-userTeam">
                        <label className="prompt">Choose a team</label><br/>
                        <input className="red" type="button" onClick={this.setRed}></input><br/>
                        {/* <p>{text}</p> */}
                        <input className="blue" type="button" onClick={this.setBlue}></input><br/>
                        
                    </div>
                    <div className="box-userTask">
                        <label className="prompt">Select task</label><br/>
                        {
                            (((this.state.team === 'R') && (this.state.redTeamSpyMaster === false)) || ((this.state.team === 'B') && (this.state.blueTeamSpyMaster === false))) ? 
                            <button className="task" type="button" onClick={this.setSpy}>spymaster</button> : null
                        }
                        <button className="task" type="button" onClick={this.setOper}>operator</button>
                    </div>
                    {this.renderRedirect()}
                    <button className="startBtn" type="button" onClick={this.submitUserInfo}>Start!</button>

                </form>
            </div>
        )
    }
}

export default UserInfo