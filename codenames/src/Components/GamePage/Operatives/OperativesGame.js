import React, {Component} from 'react'
import './OperativesGame.css'

class OperativesGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {

            redScore: 0,
            blueScore: 0,

            cardRow1Checks: [false, false, false, false, false], // Maybe try to get check states into 5 arrays instead?
            cardRow2Checks: [false, false, false, false, false],
            cardRow3Checks: [false, false, false, false, false],
            cardRow4Checks: [false, false, false, false, false],
            cardRow5Checks: [false, false, false, false, false], 

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
        const {name, value, type, checked} = event.target
        // if the type just grabbed from the event is a checkbox, set the name of the event, 
        // which is named after an element in the state - so the element in the state - to 
        // the boolean checked, otherwise set [name], in state, to the value grabbed. 
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
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
                            <form class="col-md-7"> {/* Incorporate a form here so that all checkboxes can be submitted? */}
                                <div class="row">
                                    <div class="col-md-12">
                                        <div className="clueBody">
                                            <h5 className="clue">Clue: 1 Card(s) CURRENCY</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">

                                        {/* Row One */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck"> 
                                                <div className="card-style">                         
                                                    <div class="card-body">
                                                                                      
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks" // Named the same exact way as it is in state  
							                            checked = {this.state.cardRow1Checks[0]}
							                            onChange={this.handleChange}
                                                        />
                                                        
                                                        <h5 class="card-text">Soldier</h5>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Barbeque</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Truck</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                    
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[3]}
							                            onChange={this.handleChange}
                                                        /> 

                                                        <h5 class="card-text">Parade</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[4]}
							                            onChange={this.handleChange}
                                                        />

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

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Agent</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Dollar</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Band</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Corn</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[4]}
							                            onChange={this.handleChange}
                                                        />

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

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Dash</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Hawk</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Beam</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Disease</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[4]}
							                            onChange={this.handleChange}
                                                        />

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

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Pasta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[1]}
							                            onChange={this.handleChange}
                                                        />
                                                        <h5 class="card-text">Tea</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Troll</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Radio</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[4]}
							                            onChange={this.handleChange}
                                                        />

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

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Press</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Glacier</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Salt</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 class="card-text">Bride</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[4]}
							                            onChange={this.handleChange}
                                                        />

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
                                        <div class="d-flex justify-content-end">
                                            <button className="btn" onSubmit={this.handleGuessSubmit}>Submit Guesses</button> {/*  onSubmit / onClick ? */}
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