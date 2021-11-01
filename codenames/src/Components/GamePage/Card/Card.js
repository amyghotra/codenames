import React, { Component } from "react";
import "./Card.css"



class Card extends Component{
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            task: '',
            team: '',
            content: '',
            turn: true, // true = blue turn && false = red turn

            redteamid: '',
            blueteamid: '',

            
        }
    }
    
    componentDidMount = () => {
        this.setState({
            task: this.props.task,
            team: this.state.team,
            turn: this.state.turn
            
        })
        // console.log("task : ", this.props.task)
    }

    componentDidUpdate = (event) => {
        if (event.word !== this.props.word) {
            this.setState(prevState => {
                return {
                    content: this.props.word
                }
            })
        }
    }

    handleChange = () => {
        this.setState({
            checked: true,
            turn: !this.state.turn            
        })
        console.log(this.state.content)
        this.props.increaseTeamPoints(this.state.content.category, this.state.content.word_id)
        
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
                <div>
                {(!this.state.checked) ?
                <div>
                    <h5 className="card-text">{this.state.content.word}</h5><br/>
                </div>
                :
                <div>
                    <h5 className={`card-text-${this.state.content.category}`}>{this.state.content.word}</h5><br/>
                </div>
                }
                </div>
                </div>
                </div>
                :
                <div>
                    <br/>
                    <h5 className={`card-deck-${this.state.content.category}`} >{this.state.content.word}</h5>
                    <br/>
                </div>
                }
                

            </div>
        )
    }
}

export default Card