import React, {Component} from 'react'

import Row from "../Row/Row"
import './OperativesGame.css'

class OperativesGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {
            room_key: '',
            task: 'O',
            gameWords: '',
            redScore: 0,
            blueScore: 0,
            turn: true, // true = blue turn & false = red turn 

            redteamid: '',
            blueteamid: '',
            redOperatives: [],
            redSpymasters: [],
            blueOperatives: [],
            blueSpymasters: [],
            renderPlayers: false,

        }
    }
    componentDidMount = () => {
        
    }

    componentDidUpdate = (event) =>{
        
        if (event.gameWords !== this.props.gameWords) {
            this.setState(prevState => {
                return {
                    gameWords: this.props.gameWords,
                    room_key: this.props.room_key
                }
            })
        
        }
        if(this.props.playersdata && this.state.renderPlayers === false){
            this.setState({
                renderPlayers: true
            })
            this.updatePlayers()
        }
        
    }

    updatePlayers = () => {
        for(let i = 0; i < this.props.playersdata.length; i++){
            if(this.props.playersdata[i].role === "S"){
                if(this.props.playersdata[i].team === "R"){
                    this.setState({
                        redSpymasters: [...this.state.redSpymasters, this.props.playersdata[i].operative_screen_name ]
                    })
                }
                else if(this.props.playersdata[i].team === "B"){
                    this.setState({
                        blueSpymasters: [...this.state.blueSpymasters, this.props.playersdata[i].operative_screen_name]
                    })
                }
            }
            else if(this.props.playersdata[i].role === "O"){
                if(this.props.playersdata[i].team === "R"){
                    this.setState({
                        redOperatives: [...this.state.redOperatives, this.props.playersdata[i].operative_screen_name ]
                    })
                }
                else if(this.props.playersdata[i].team === "B"){
                    this.setState({
                        blueOperatives: [...this.state.blueOperatives, this.props.playersdata[i].operative_screen_name]
                    })
                }

            }
            
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
                                            <h7 className="teamScore">{this.props.redPoints}</h7>
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
                                            <h7 className="teamScore">{this.props.bluePoints}</h7>
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
                                <Row task={this.state.task} 
                                     rowWords={[this.state.gameWords[0], 
                                                this.state.gameWords[1],
                                                this.state.gameWords[2],
                                                this.state.gameWords[3],
                                                this.state.gameWords[4]]}
                                     increaseTeamPoints = {this.props.increaseTeamPoints}/>  
                                <Row task={this.state.task} 
                                     rowWords={[this.state.gameWords[5], 
                                                this.state.gameWords[6],
                                                this.state.gameWords[7],
                                                this.state.gameWords[8],
                                                this.state.gameWords[9]]}
                                     increaseTeamPoints = {this.props.increaseTeamPoints}/>
                                <Row task={this.state.task} 
                                     rowWords={[this.state.gameWords[10], 
                                                this.state.gameWords[11],
                                                this.state.gameWords[12],
                                                this.state.gameWords[13],
                                                this.state.gameWords[14]]}
                                     increaseTeamPoints = {this.props.increaseTeamPoints}/>
                                <Row task={this.state.task} 
                                     rowWords={[this.state.gameWords[15], 
                                                this.state.gameWords[16],
                                                this.state.gameWords[17],
                                                this.state.gameWords[18],
                                                this.state.gameWords[19]]}
                                     increaseTeamPoints = {this.props.increaseTeamPoints}/>
                                <Row task={this.state.task} 
                                     rowWords={[this.state.gameWords[20], 
                                                this.state.gameWords[21],
                                                this.state.gameWords[22],
                                                this.state.gameWords[23],
                                                this.state.gameWords[24]]}
                                     increaseTeamPoints = {this.props.increaseTeamPoints}/>
                                
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