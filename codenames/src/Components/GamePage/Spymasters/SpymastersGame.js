import React, {Component} from 'react'
import './SpymastersGame.css'

class SpymastersGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {

            spymasterClueWord: "",
            spymasterClueCount: 0,

            redScore: 0,
            blueScore: 0,

            cardRow1Words: [], // Store words into arrays from props / database
            cardRow2Words: [],
            cardRow3Words: [],
            cardRow4Words: [],
            cardRow5Words: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleGuessSubmit.bind(this)
        this.incrementClueCount = this.incrementClueCount.bind(this)
        this.decrementClueCount = this.decrementClueCount.bind(this)
    }
    // For changing state when elements are changed on the page by user
    handleChange(event) {
        //const {name, value, type, checked} = event.target
        // if the type just grabbed from the event is a checkbox, set the name of the event, 
        // which is named after an element in the state - so the element in the state - to 
        // the boolean checked, otherwise set [name], in state, to the value grabbed. 
        //type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        const value = event.target.value;
        this.setState({
            spymasterClueWord: value,
        });
        //console.log(this.state.spymasterClueWord);
        
    }

    // For handling the players' submitting their guesses / word picks
    handleGuessSubmit(event) {
        event.preventDefault();

        let numTemp = this.state.spymasterClueCount ;
        this.setState({spymasterClueCount: numTemp});
        console.log(this.state.spymasterClueWord);
        console.log(this.state.spymasterClueCount);

        this.forceUpdate();
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

    render() {
    return(
        <div className="game">
            <br />
            <h6 className="gameCode"> Game Code: 00000 </h6>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-4">
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
                            <div class="col-md-7"> {/* Changed back to div from a form */}
                                <div class="row">
                                    <div class="col-md-12">

                                        {/* Row One */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck"> 
                                                <div className="card-style">                         
                                                    <div class="card-body">
                                                                                      
                                                        <br /> {/* !!! Replaced all checkboxes with breaks */}
                                                        
                                                        <h5 class="card-text">Soldier</h5>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Barbeque</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Truck</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                    
                                                        <br />

                                                        <h5 class="card-text">Parade</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        
                                                        <br />

                                                        <h5 class="card-text">India</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        
                                        {/* Row Two */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Agent</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Dollar</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Band</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Corn</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Scarecrow</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        
                                        {/* Row Three */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Dash</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Hawk</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Beam</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Disease</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Tablet</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        {/* Row Four */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Pasta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Tea</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Troll</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Radio</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Violet</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        {/* Row Five */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Press</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Glacier</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Salt</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Bride</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <br />

                                                        <h5 class="card-text">Delta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                                <br />
                                
                                <div class="row">
                                    <div class="col-md-12">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="spymasterClue">
                                            <input 
                                            type="text" 
                                            name="clueWord" 
                                            placeholder ="Type clue here" 
                                            onChange={this.handleChange} 
                                            value={this.state.spymasterClueWord} 
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