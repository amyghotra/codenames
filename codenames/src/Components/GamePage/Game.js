import React, {Component} from 'react'
import './Game.css'
import SpymastersGame from './Spymasters/SpymastersGame'
import OperativesGame from './Operatives/OperativesGame'

class Game extends Component {
    constructor() {
        super()
        this.state = {
            spymaster: true
        }
    }
    render() {
        if (this.state.spymaster) {
            return (
                <SpymastersGame />
            )
        }
        else {
            return (
                <OperativesGame />
            )
        }
    }
}

export default Game