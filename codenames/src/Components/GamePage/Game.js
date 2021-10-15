import React, {Component} from 'react'
import './Game.css'
import SpymastersGame from './Spymasters/SpymastersGame.js'
import OperativesGame from './Operatives/OperativesGame.js'


class Game extends Component {
    constructor() {
        super()
        this.state = {
            spymaster: true,
            room_key: '',
            roomid: '',
            nickname: '',
            team: '',
            task: '',
            red_score: 0,
            blue_score: 0,
            gameid: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            room_key: this.props.location.state.room_key,
            roomid: this.props.location.state.roomid,
            nickname: this.props.location.state.nickname,
            team: this.props.location.state.team,
            task: this.props.location.state.task,
            gameid: this.props.location.state.gameid
        })
        console.log(this.props.location.state.gameid)
    }
    

    render() {
        return(
            <div>
                {
                    this.state.spymaster ?
                    
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