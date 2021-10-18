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
            gameWords: '',
            playersdata: '',
        }
    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/codenames/players').then(res => {
            this.setState({
                playersdata: res.data
            })
            let playerExist = false;
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === this.props.location.state.gameid && res.data[i].room === this.props.location.state.room_key && res.data[i].user_id === this.props.location.state.playerid) {
                    console.log('do nothing ')
                    playerExist = true;
                }
            }

            if(playerExist === false) {
                console.log('making game room with ', this.props.location.state.playerid)
                axios.post('http://127.0.0.1:8000/codenames/players', {
                    operative_screen_name: this.props.location.state.nickname,
                    team: this.props.location.state.team,
                    role: this.props.location.state.task,
                    room: this.props.location.state.room_key,
                    game_id: this.props.location.state.gameid,
                    user_id: this.props.location.state.playerid
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
            gameWords: this.props.location.state.gameWords,
            playerid: this.props.location.state.playerid
        })
    }
    

    render() {
        return(
            <div>
                {
                    this.state.task === 'S' ?
                    
                    <SpymastersGame 
                        room_key = {this.state.room_key}
                    />

                    : 

                    <OperativesGame 
                        room_key = {this.state.room_key}
                    />
                }
            </div>
        )
    }
}

export default Game