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
            gameid: '',

            // WebSocket
            ws: null,
            number: 0, // Need to get number of card from props, can just pass it in from the game page when calling Row
            // So all checkboxes should check with one check for right now

            winningTeam: '',
        }
        this.socketSend = this.socketSend.bind(this);
    }

    socketSend = () => {
        // Do nothing if socket hasn't connected yet
        if (this.state.ws === null) {
            return
        }
        var data = {
            "number": this.props.number, // used props instead of state, states not setting
            "checked": true //this.state.checked // Hard coded to true, it'll never be false ?
        }
        this.state.ws.send(JSON.stringify(data)) // Testing send
        console.log(data)
    }
    
    componentDidMount = () => {
    }

    componentDidUpdate = (event) => {
        if (event.word !== this.props.word) {
            this.setState(prevState => {
                return {
                    content: this.props.word,
                    task: this.props.task,
                    team: this.state.team,
                    turn: this.state.turn,
                    number: this.props.number, // Not setting number ?
                    gameid: this.props.gameid
                }
            })

            if(this.props.word.category === 'A' || this.props.word.category === 'R' || this.props.word.category === 'B' ||this.props.word.category === 'C' ) {
                let wordGuessed = localStorage.getItem(this.props.word.word_id);
                this.setState({
                    checked: wordGuessed
                })
            }
            //Deleted this.props.task === "O" && so that the spymasters could also get the websocket of the words taht were checked.
            if ( this.state.ws === null) {
                this.connect();
            }
        }
    }

    /*
     * @function connect
     * This function establishes the connect with the websocket and also ensures 
     * constant reconnection if connection closes
    */
    connect = () => {
        var ws = new WebSocket('ws://localhost:8000/checkbox/checkbox/' 
                                + this.props.number + '/' + this.props.gameid + '/'); 
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; // increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); // call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const data = JSON.parse(evt.data)
            console.log(data)
            console.log("received check!")
            let number = data.number
            let checked = data.checked
            if (number === this.props.number && this.state.checked !== true) { // Using props instead of state again
                this.setState(prevState => {
                    return {
                        checked: checked
                    }
                })
            }
        };
        this.setState(prevState => {
            return {
                ws: ws
            }
        })
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state.ws;
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); 
        // Check if websocket instance is closed, if so call `connect` function.
    };

    handleChange = (e) => {

        // if(!this.state.checked) {
        //     this.setState({
        //         checked: true,
        //         turn: !this.state.turn            
        //     })
        //     console.log(this.state.checked)
        //     this.props.increaseTeamPoints(this.state.content.category, this.state.content.word_id)
        //     localStorage.setItem(this.state.content.word_id, JSON.stringify(true))
        //     this.socketSend() 
        // }

        if(this.props.currentAllowedPlayer !== null && this.props.currentAllowedPlayer.user_id !== null) {
            if(!this.state.checked && this.props.currentAllowedPlayer.user_id === this.props.thisPlayer) {
                this.setState({
                    checked: true,
                    turn: !this.state.turn            
                })
                console.log(this.state.checked)
                this.props.increaseTeamPoints(this.state.content.category, this.state.content.word_id) // Moved to Socket's onmessage
                localStorage.setItem(this.state.content.word_id, JSON.stringify(true))
                this.socketSend() 
            }
        } else { 
            e.target.checked = false
            this.setState({
                checked: false      
            })
        }

    }
    

    render(){
        return(
            <div>
                {(this.state.task === 'O') ?
                <div>
                    {(!this.state.checked) ?
                    <div className="card-deck">
                        <input  className = "checkboxStructure"
                                id = "checkbox"
                                type = "checkbox"
                                name = "checkbox"
                                checked = {this.state.checked}
                                disabled = {(this.props.currentAllowedPlayer && 
                                    this.props.thisPlayer !== this.props.currentAllowedPlayer.user_id) || 
                                    (this.props.currentAllowedPlayer && 
                                    this.props.thisPlayer === this.props.currentAllowedPlayer.user_id && 
                                    this.props.spymasterClueWord.indexOf(' ') >= 0)}
                                onChange={this.handleChange}/>
                                <br/> 
                        <h5 className="card-text" >{this.state.content.word}</h5><br/>
                    </div>
                    :
                    <div className={`card-deck-${this.state.content.category}`}>
                        <input  className = "checkboxStructure"
                                id = "checkbox"
                                type = "checkbox"
                                name="checkbox-checked"
                                checked = {this.state.checked}
                                disabled = {(this.props.currentAllowedPlayer && 
                                    this.props.thisPlayer !== this.props.currentAllowedPlayer.user_id) || 
                                    (this.props.currentAllowedPlayer && 
                                    this.props.thisPlayer === this.props.currentAllowedPlayer.user_id && 
                                    this.props.spymasterClueWord.indexOf(' ') >= 0)}
                                onChange={this.handleChange}/>
                                <br/> 

                        <h5 className={`card-text-${this.state.content.category}`} >{this.state.content.word}</h5><br/>
                    </div>
                    }

                </div>

                :
                
                <div>
                    {(!this.state.checked) ?
                        <div className={`card-deck-${this.state.content.category}`}>
                            <br/>
                            <h5>{this.state.content.word}</h5>
                            <br/>
                        </div>
                        :
                        <div className={`card-deck-revealed-${this.state.content.category}`}>
                            <br/>
                            <h5>{this.state.content.word}</h5>
                            <br/>
                        </div>
                    }
                </div>
                }

            </div>
        )
    }
}

export default Card