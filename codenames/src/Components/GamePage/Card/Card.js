import React, { Component } from "react";
import "./Card.css"



class Card extends Component{
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            task: '',
            word: "TEMPWORD",
            team: '',
            turn: true, // true = blue turn && false = red turn
        }
    }
    
    componentDidMount = () => {
        this.setState({
            task: this.props.task,
            word: this.state.word,
            team: this.state.team,
            turn: this.state.turn
            
        })
        // console.log("task : ", this.props.task)
    }

    handleChange = () => {
        this.setState({
            checked: true,
            turn: !this.state.turn
            
        })
        console.log("turn : " , this.state.turn)
    }

    
    

    render(){
        return(
            <div>

                {(this.state.task === 'O') ?
                <div>
                <div className="card-deck">
                <div className="card-style"></div>    
                <input  className = "checkboxStructure"
                        type = "checkbox"
						checked = {this.state.checked}
                        onClick={this.handleChange}/><br/>

                <h5 className="card-text">{this.state.word}</h5><br/>
                </div>
                </div>
                :
                <div>
                    <br/>
                    <h5 className="card-text">{this.state.word}</h5>
                    <br/>
                </div>
                }
                

            </div>
        )
    }
}

export default Card