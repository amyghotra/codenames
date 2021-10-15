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
            team: '',
            redteamid: '',
            blueteamid: '',
            task: '',
            redirect: false,
            gamesData: '',
            gameid: 0
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

    }

    //make the game as long as the roomid exist and if there isnt a game that matches the roomid already
    renderGameId = (roomid) => {

        let roomidexist = false;

        axios.get('http://127.0.0.1:8000/codenames/games').then(res => {
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].connected_room_key === roomid) {
                    roomidexist = true;
                    this.setState({
                        gameid: res.data[i].game_id
                    })
                    this.renderTeamId(res.data[i].game_id)
                }
            }
            if(roomidexist === false) {
                axios.post('http://127.0.0.1:8000/codenames/games', {
                    connected_room_key: roomid
                }).then(res => {
                    this.setState({
                        gameid: res.data.game_id
                    })
                    this.renderTeamId(res.data.game_id)
                })
            }
        })


    }

    renderTeamId = (gameid) => {
        console.log(gameid)
        let redteamidexist = false; 
        let blueteamidexist = false;

        axios.get('http://127.0.0.1:8000/codenames/redTeam').then(res => {
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === gameid) {
                    redteamidexist = true;
                    console.log(redteamidexist)
                    this.setState({
                        redteamid: res.data[i].red_team_id
                    })
                }
            }
        })

        axios.get('http://127.0.0.1:8000/codenames/blueTeam').then(res => {
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === gameid) {
                    blueteamidexist = true;
                    console.log(blueteamidexist)
                    this.setState({
                        blueteamid: res.data[i].blue_team_id
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
        if(this.state.room_key !== null && this.state.nickname !== null && this.state.team !== null && this.state.task !== null) {
            axios.post('http://127.0.0.1:8000/codenames/userInfo', {
                connected_room_key:this.props.location.state.room_key,
                nickname: this.state.nickname, 
                team: this.state.team,
                task: this.state.task
            })
            .then(repsonse => {
                console.log('RESPONSE: ', repsonse)
                for(let i = 0; i < this.state.gamesData.length; i++) {
                    if (this.state.gamesData[i].connected_room_key === this.state.roomid) {
                        this.setState({
                            gameid: this.state.gamesData[i].game_id
                        })
                    }
                }
                this.createGame()
            })
            .catch(error => {
                console.log(error)
            })
        }


    }

    createGame = () => {
        if (this.state.team === 'R') {
            axios.post('http://127.0.0.1:8000/codenames/redTeam', {
                game_id: this.state.gameid,
                connected_room_key: this.state.roomid
            }).then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            }) 
        }
        else if (this.state.team === 'B') {
            axios.post('http://127.0.0.1:8000/codenames/blueTeam', {
                game_id: this.state.gameid,
                connected_room_key: this.state.roomid
            })
        }

        // this.setState({
        //     redirect: true
        // })
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
                    gameid: this.state.gameid
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

    
    render() {
        
        // const text = this.state.blue_team ? "blue team" : "red Team"
        return(
            <div className="userInfo">
                <br />
                <h6 className="gameCode"> Game Code: {this.state.room_key} </h6>
                <form className="container">
                    <div className="box-userInfo-left">
                        <label className="prompt">Enter nickname</label><br/><br/>
                        <input 
                        className="nickname" 
                        value={this.state.nickname}
                        name= "nickname"
                        type="text" 
                        placeholder="Nickname" 
                        spellCheck="false" 
                        onChange={this.handleChange}/><br/>
                        <label className="prompt">Select task</label><br/>
                        <button className="task" type="button" onClick={this.setSpy}>spymaster</button><br/>
                        <button className="task" type="button" onClick={this.setOper}>operator</button>

                    </div>
                    <div className="box-userInfo-right">
                        <label className="prompt">Choose a team</label><br/>
                        <input className="red" type="button" onClick={this.setRed}></input><br/>
                        {/* <p>{text}</p> */}
                        <input className="blue" type="button" onClick={this.setBlue}></input><br/>
                        
                    </div>
                    {this.renderRedirect()}
                    <button className="startBtn" type="button" onClick={this.submitUserInfo}>Start!</button>

                </form>
            </div>
        )
    }
}

export default UserInfo