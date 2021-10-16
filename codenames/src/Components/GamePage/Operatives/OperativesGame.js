import React, {Component} from 'react'
import '../Game.css'

class OperativesGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
   
    constructor() {
        super()
        this.state = {

            redScore: 0,
            blueScore: 0,

            cardRow1Colors: ['red', 'red', 'black', 'neutral', 'neutral'],
            cardRow2Colors: ['red', 'blue', 'neutral', 'neutral', 'blue'],
            cardRow3Colors: ['neutral','neutral', 'blue', 'red', 'neutral'],
            cardRow4Colors: ['neutral', 'neutral', 'blue', 'neutral', 'blue'],
            cardRow5Colors: ['blue', 'red', 'neutral', 'neutral', 'red'],

            cardRow1Checks: [false, false, false, false, false], // Maybe try to get check states into 5 arrays instead?
            cardRow2Checks: [false, false, false, false, false],
            cardRow3Checks: [false, false, false, false, false],
            cardRow4Checks: [false, false, false, false, false],
            cardRow5Checks: [false, false, false, false, false], 

            cardRow1Words: [], // Store words into arrays from props / database / backend
            cardRow2Words: [],
            cardRow3Words: [],
            cardRow4Words: [],
            cardRow5Words: [],

            cardRow1Revealed: [false, false, false, false, false], // !!! Only applied to first row so far
            cardRow2Revealed: [false, false, false, false, false],
            cardRow3Revealed: [false, false, false, false, false],
            cardRow4Revealed: [false, false, false, false, false],
            cardRow5Revealed: [false, false, false, false, false]
        }

        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleGuessSubmit.bind(this)
    }

    componentDidMount() {

    }

    // For changing state when elements are changed on the page by user
    handleChange(event) {
        const {name, value, type, checked} = event.target
        // if the type just grabbed from the event is a checkbox, set the name of the event, 
        // which is named after an element in the state - so the element in the state - to 
        // the boolean checked, otherwise set [name], in state, to the value grabbed. 
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })

        
        //const temp = this.state.cardColorArray[row][col]
        //const colorHolder = parseInt(temp, 10);
        //this.setState({cardColor: colorHolder})
        //const cardColor= this.state.cardColor
        //this.setState({cardColor:this.setColor()})
        
    }

    // For handling the players' submitting their guesses / word picks
    handleGuessSubmit(event){
        //event.preventDefault();
        //this.forceUpdate();
    }

    render() {
      /*  const board = [] // idea for trying to use a loop to get all of the cards rendered
        for (let i = 0; i < 5; i++) {

            for (let j = 0; j < 5; j++) {

            }
        } */
    return(
        <div className="game">
            <br />
            <h6 className="gameCode"> Game Code: 00000 </h6>
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
                            <form className="col-md-7" onSubmit={this.handleGuessSubmit}> {/* Incorporate a form here so that all checkboxes can be submitted? */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="clueBody">
                                            <h5 className="clue">Clue: 1 Card(s) CURRENCY</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        
                                        {/* Row One */}
                                        <div className="row">
                                            <div className="col">
                                                <div className={ !this.state.cardRow1Revealed[0] ? // If already revealed,
                                                "card-deck-neutral" : // Hide true color
                                                "card-deck-" + this.state.cardRow1Colors[0] // Else display true color
                                                }>                  
                                                    <div className="card-body">

                                                        {this.state.cardRow1Revealed[0] ? // If card revealed,
                                                        < br /> : // Don't show checkbox (br changes the spacing, fix?)
                                                        <input // Else display checkbox
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks" // Named the same exact way as it is in state 
							                            checked = {this.state.cardRow1Checks[0]}
							                            onChange={this.handleChange}
                                                        />}
                                                                                                                
                                                        <h5 className="card-text">Soldier</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className={ !this.state.cardRow1Revealed[1] ? 
                                                "card-deck-neutral" : 
                                                "card-deck-" + this.state.cardRow1Colors[1] 
                                                }>     
                                                    <div className="card-body">

                                                        {this.state.cardRow1Revealed[0] ? // If card revealed,
                                                        < br /> :
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[1]}
							                            onChange={this.handleChange}
                                                        />}

                                                        <h5 className="card-text">Barbeque</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className={ !this.state.cardRow1Revealed[2] ? 
                                                "card-deck-neutral" : 
                                                "card-deck-" + this.state.cardRow1Colors[2] 
                                                }>
                                                    <div className="card-body">
                                                        
                                                        {this.state.cardRow1Revealed[2] ? // If card revealed,
                                                        < br /> :
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[2]}
							                            onChange={this.handleChange}
                                                        />}

                                                        <h5 className="card-text">Truck</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className={ !this.state.cardRow1Revealed[3] ? 
                                                "card-deck-neutral" : 
                                                "card-deck-" + this.state.cardRow1Colors[3] 
                                                }>
                                                    <div className="card-body">
                                                    
                                                        {this.state.cardRow1Revealed[3] ? // If card revealed,
                                                        < br /> :
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[3]}
							                            onChange={this.handleChange}
                                                        />} 

                                                        <h5 className="card-text">Parade</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className={ !this.state.cardRow1Revealed[4] ? 
                                                "card-deck-neutral" : 
                                                "card-deck-" + this.state.cardRow1Colors[4] 
                                                }>
                                                    <div className="card-body">
                                                        
                                                        {this.state.cardRow1Revealed[4] ? // If card revealed,
                                                        < br /> :
                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow1Checks"
							                            checked = {this.state.cardRow1Checks[4]}
							                            onChange={this.handleChange}
                                                        />}

                                                        <h5 className="card-text">India</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        
                                        {/* Row Two */}
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Agent</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Dollar</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Band</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Corn</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow2Checks"
							                            checked = {this.state.cardRow2Checks[4]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Scarecrow</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        
                                        {/* Row Three */}
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Dash</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Hawk</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Beam</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Disease</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow3Checks"
							                            checked = {this.state.cardRow3Checks[4]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Tablet</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        {/* Row Four */}
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Pasta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[1]}
							                            onChange={this.handleChange}
                                                        />
                                                        <h5 className="card-text">Tea</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Troll</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Radio</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow4Checks"
							                            checked = {this.state.cardRow4Checks[4]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Violet</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        {/* Row Five */}
                                        <div className="row">
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[0]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Press</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[1]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Glacier</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[2]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Salt</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[3]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Bride</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-deck">
                                                    <div className="card-body" style={{backgroundColor: this.state.cardColor}} onChange={this.handleChange}>

                                                        <input 
                                                        className = "checkboxStructure"
							                            type = "checkbox"
							                            name = "cardRow5Checks"
							                            checked = {this.state.cardRow5Checks[4]}
							                            onChange={this.handleChange}
                                                        />

                                                        <h5 className="card-text">Delta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                                <br />
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-end">
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