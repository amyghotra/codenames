import React, {Component} from 'react'

import Row from "../Row/Row"
import './OperativesGame.css'

class OperativesGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor(props) {
        super(props)
        this.state = {
            room_key: '',
            task: 'O',

            redScore: 0,
            blueScore: 0,
            turn: true, // true = blue turn & false = red turn 

        }
    }
    componentDidMount = () => {
        this.setState = {
            room_key: this.props.room_key
        }
    }

    

    // For handling the players' submitting their guesses / word picks
    handleEndTurn = () => {
        this.setState = {
            turn: !this.state.turn
        }
        console.log((this.state.turn)? "Blue turn" : "Red turn" )
    }

    incrementClueCount = () => {
		this.setState(prevState => { // Update with inline function
			return {
				spymasterClueCount: prevState.spymasterClueCount + 1
			}
		})
	}
	decrementClueCount = () => {
		this.setState(prevState => {
			return {
				spymasterClueCount: prevState.spymasterClueCount - 1
			}
		})
	}

    

    render() {
    return(
        <div className="game">
            <br />
            <h6>OPERATORS</h6>
            <h6 className="gameCode"> Game Code: {this.props.room_key} </h6>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="gameScores">
                                    <div className="redTeam">
                                        <div>
                                            <h6 className="teamTitle">Red Team</h6>
                                            <h7 className="teamScore">{this.state.redScore}</h7>
                                        </div>
                                        <br />
                                        <br />
                                        <h6 className="teamContent"> Spymasters:</h6>
                                        <li className="bulletContent">username</li>
                                        <li className="bulletContent">username</li>
                                        <h6 className="teamContent"> Operatives:</h6>
                                        <li className="bulletContent">username</li>
                                        <li className="bulletContent">username</li>
                                    </div>
                                    <br />
                                    <div className="blueTeam">
                                        <div>
                                            <h6 className="teamTitle">Blue Team</h6>
                                            <h7 className="teamScore">{this.state.blueScore}</h7>
                                        </div>
                                        <br />
                                        <br />
                                        <h6 className="teamContent"> Spymasters:</h6>
                                        <li className="bulletContent">username</li>
                                        <li className="bulletContent">username</li>
                                        <h6 className="teamContent"> Operatives:</h6>
                                        <li className="bulletContent">username</li>
                                        <li className="bulletContent">username</li>
                                    </div>
                                </div>
                            </div>
                            <form className="col-md-7"> {/* Incorporate a form here so that all checkboxes can be submitted? */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="clueBody">
                                            <h5 className="clue">Clue: 1 Card(s) CURRENCY</h5>
                                        </div>
                                    </div>
                                </div>
                                        <Row task={this.state.task}/>   
                                        <Row task={this.state.task}/>
                                        <Row task={this.state.task}/>
                                        <Row task={this.state.task}/>
                                        <Row task={this.state.task}/>
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-end">
                                            <button className="btn" onChange={this.handleEndTurn}>End Turn</button> {/*  onSubmit / onClick ? */}
                                        </div>
                                    </div>
                                </div>
                            </form> {/* Changed from div to form */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default OperativesGame