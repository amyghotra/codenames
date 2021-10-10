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
            nickname: '',
            team: ''
        }
    }

    componentDidMount = () => {
        console.log( 'this is the info from userinfo page', this.props.location.state.room_key, " ", this.props.location.state.nickname, " ", this.props.location.state.team)
        this.setState({
            room_key: this.props.location.state.room_key,
            nickname: this.props.location.state.nickname,
            team: this.props.location.state.team
        })
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