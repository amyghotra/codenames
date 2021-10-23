import React, {Component} from 'react'
import Row from "../Row/Row"
import './SpymastersGame.css'

class SpymastersGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {
            room_key: '',
            task:'S',
            gameWords: [],
            spymasterClueWord: "",
            spymasterClueCount: 0,

            redScore: 0,
            blueScore: 0,

            
        }
        
    }
    componentDidMount = () => {
        // this.setState = ({
        //     room_key: this.props.room_key,
        //     gameWords: this.props.gameWords,
            
        // })
        console.log("Game Words Array before update: ", this.props.gameWords)
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
        console.log(this.props.gameWords)
        if (event.gameWords !== this.props.gameWords) {
            this.setState(prevState => {
                return {
                    gameWords: this.props.gameWords,
                    room_key: this.props.room_key
                }
            })
            console.log("Game Words Array after update: ", this.props.gameWords)
        }
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
                            <div className="col-md-7"> {/* Changed back to div from a form */}
                                <div className="row">
                                    <div className="col-md-12">
                                        
                                      <Row task={this.state.task} 
                                           rowWords={[this.state.gameWords[0], 
                                                      this.state.gameWords[1],
                                                      this.state.gameWords[2],
                                                      this.state.gameWords[3],
                                                      this.state.gameWords[4]]}/>  
                                      <Row task={this.state.task} 
                                           rowWords={[this.state.gameWords[5], 
                                                      this.state.gameWords[6],
                                                      this.state.gameWords[7],
                                                      this.state.gameWords[8],
                                                      this.state.gameWords[9]]}/>
                                      <Row task={this.state.task} 
                                           rowWords={[this.state.gameWords[10], 
                                                      this.state.gameWords[11],
                                                      this.state.gameWords[12],
                                                      this.state.gameWords[13],
                                                      this.state.gameWords[14]]}/>
                                      <Row task={this.state.task} 
                                           rowWords={[this.state.gameWords[15], 
                                                      this.state.gameWords[16],
                                                      this.state.gameWords[17],
                                                      this.state.gameWords[18],
                                                      this.state.gameWords[19]]}/>
                                      <Row task={this.state.task} 
                                           rowWords={[this.state.gameWords[20], 
                                                      this.state.gameWords[21],
                                                      this.state.gameWords[22],
                                                      this.state.gameWords[23],
                                                      this.state.gameWords[24]]}/>
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