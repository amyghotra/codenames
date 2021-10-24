import React, {Component} from 'react'
import Row from "../Row/Row"
import './SpymastersGame.css'

class SpymastersGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {
            room_key: '',
            task:'S',
            gameWords: '',
            playersdata: '',
            spymasterClueWord: "",
            spymasterClueCount: 0,

            redScore: 0,
            blueScore: 0,

            redteamid: '',
            blueteamid: '',
            redOperatives: [],
            redSpymasters: [],
            blueOperatives: [],
            blueSpymasters: [],
            renderPlayers: false,

            
        }
        
    }

    /*
        states affected: 
            gameWords
        what it does: 
            The first parameter for this method is gameWords before the update; so, testing 
            whether it has changed is done here. If it has changed then it will update the 
            gameWords to how the game component has them. 
    */
    componentDidUpdate = (event) =>{
        
        if (event.gameWords !== this.props.gameWords) {
            this.setState(prevState => {
                return {
                    gameWords: this.props.gameWords,
                    room_key: this.props.room_key,
                    
                }
            })
            // if(this.props.playersdata && this.state.renderPlayers === false){
            //     this.setState({
            //         renderPlayers: true
            //     })
            //     this.updatePlayers()
            // }
        }
        
        
    }

    componentWillReceiveProps = (players) => {
        
        this.setState({
            playersdata: players.playersdata,
            renderPlayers: true
        })
        this.updatePlayers(players.playersdata)

        
    }
   


    // For changing state when elements are changed on the page by user
    handleChange(event) {
        
    }
    // For handling the players' submitting their guesses / word picks
    handleGuessSubmit(event) {
        
    }
    incrementClueCount() {
		this.setState(prevState => { // Update with inline function
			return {
				spymasterClueCount: prevState.spymasterClueCount + 1
			}
		})
	}
	decrementClueCount() {
		this.setState(prevState => {
			return {
				spymasterClueCount: prevState.spymasterClueCount - 1
			}
		})
	}

    // generateGame = () => {
        
    //     for(let i = 0; i < 5; i++) {
    //         <Row task={this.state.task}/>
    //     }
        
    // }

    updatePlayers = (player) => {
        if(this.state.renderPlayers === true){

            for(let i = 0; i < player.length; i++){
                
                if(player[i].role === "S"){
                    if(player[i].team === "R"){
                        let redSpymasters = this.state.redSpymasters
                        redSpymasters.push(player[i])
                        this.setState({
                            redSpymasters
                        })
                        
                    }
                    else if(player[i].team === "B"){
                        this.setState({
                            blueSpymasters: [...this.state.blueSpymasters, player[i]]
                        })
                        
                    }
                }
                else if(player[i].role === "O"){
                    if(player[i].team === "R"){
                        this.setState({
                            redOperatives: [...this.state.redOperatives, player[i]]
                        })
                        
                    }
                    else if(player[i].team === "B"){
                        this.setState({
                            blueOperatives: [...this.state.blueOperatives, player[i]]
                        })
                        
                    }
                    
                }
                
                
            }
        }
        
    }

    render() {
        


    return(
        <div className="game">
            <br />
            <h6>SPYMASTERS</h6>
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
                                            {this.state.redSpymasters.map(player => (
                                                <li className="bulletContent" key="{player}">{player.operative_screen_name}</li>
                                            ))}
                                        
                                        <h6 className="teamContent"> Operatives:</h6>
                                            {this.state.redOperatives.map(player => (
                                                <li className="bulletContent" key="{player}">{player.operative_screen_name}</li>
                                            ))}
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
                                            {this.state.blueSpymasters.map(player => (
                                                <li className="bulletContent" key="{player}">{player.operative_screen_name}</li>
                                            ))}
                                        <h6 className="teamContent"> Operatives:</h6>
                                            {this.state.blueOperatives.map(player => (
                                                <li className="bulletContent" key="{player}">{player.operative_screen_name}</li>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7"> {/* Changed back to div from a form */}
                                <div className="row">
                                    <div className="col-md-12">
                                        
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
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <form>
                                            <div className="spymasterClue">
                                            <input 
                                            type="text" 
                                            value={this.state.spymasterClueWord} 
                                            name="clueWord" 
                                            placeholder="Type clue here" 
                                            onChange={this.handleChange} 
                                            />
                                            <div className="counter">
                                                {/* type = "button" to NOT make it submit the form */}
                                                <button type = "button" onClick={this.incrementClueCount}>+</button>
                                                <h6>{this.state.spymasterClueCount}</h6>
                                                <button type = "button" onClick={this.decrementClueCount}>-</button>
                                            </div>
                                            <button>Submit Clue</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> {/* Changed back to div from a form */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default SpymastersGame