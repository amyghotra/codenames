import React, {Component} from 'react'
import './Game.css'
import SpymastersGame from './Spymasters/SpymastersGame'
import OperativesGame from './Operatives/OperativesGame'
import OperativesGame2 from './Operatives/OperativesGame2' //to test put the color changing. doesn't work.


class Game extends Component {
    constructor() {
        super()
        this.state = {
            spymaster: true //changing to false will allow you to see the operatives view.
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
                <OperativesGame/>
            )
        }
    }
}

export default Game