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

            ws: null
            
        }
    }
    
    websocket = () => {
        console.log(this.state.gameid)
        console.log(this.state.room_key)
        let ws = new WebSocket(`ws://localhost:8000/ws/game/${this.state.gameid}`)
        this.setState({ws:ws})
        ws.onopen = () => {
            console.log("connected websocket main component card.js")
        };
        ws.onmessage = e => {
            console.log("inside card.js ws.onmessage")
            const data = JSON.parse(e.data)
            console.log(data)
        }
        ws.onerror = err => {
            console.error(
                "Socket encountered error card.js: ",
                err.message,
                "Closing socket card.js"
            );

            ws.close();
        };
    }
      
    
    componentDidMount = () => {
        this.setState({
            task: this.props.task,
            team: this.state.team,
            turn: this.state.turn
            
        })

        // this.websocket()
    }

    componentDidUpdate = (event) => {
        
        if (event.word !== this.props.word) {
            this.setState(prevState => {
                return {
                    content: this.props.word,
                }
            })

            if(this.props.word.category === 'A' || this.props.word.category === 'R' || this.props.word.category === 'B') {
                let wordGuessed = localStorage.getItem(this.props.word.word_id);
                this.setState({
                    checked: wordGuessed
                })
            }
        }
    }

    handleChange = () => {
        if(!this.state.checked) {
            this.setState({
                checked: true,
                turn: !this.state.turn            
            })
            // this.state.ws.onopen = () => {
            //     console.log("attemtping to send some stuff to the websocket card.js")
            //     this.state.ws.send(JSON.stringify({
            //         'cardsPlayed': this.props.word
            //     }));
            // }
            // console.log(this.state.checked)
            // this.props.increaseTeamPoints(this.state.content.category, this.state.content.word_id)
            localStorage.setItem(this.state.content.word_id, JSON.stringify(true))
        }
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