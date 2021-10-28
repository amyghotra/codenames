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
            number: 0, // Need to get number of card from props, can just pass it in from the game page when calling Row
            // So all checkboxes should check with one check
            ws: null
        }
    }
    // make new websocket instance, pass a url address to send requests to
    // as defined in routing.py in the path function
    //ws = new WebSocket('ws://localhost:8000/ws/some_url/') // LINK IS NAME OF SOCKET FOUND IN ROUTING.PY PATH()
    
    componentDidMount = () => {
        this.setState({
            task: this.props.task,
            team: this.state.team,
            turn: this.state.turn
            
        })
        if (this.props.task === "O") { // Check props, state was giving issues
            this.connect(); // Only make websocket for Operatives' view
        }
        // console.log("task : ", this.props.task)

        // Websocket functions
        // if (this.state.task === 'O') {

        //     // const roomName = "game" //location.pathname.substr(1); 
        //     // var socketPath = 'ws://'
        //     //     + window.location.host
        //     //     + '/ws/'
        //     //     + roomName;
        //     // const ws = new WebSocket(
        //     // socketPath
        //     // );

        //     this.ws.onopen = () => {
        //         // on connecting, do nothing but log it to the console
        //         console.log('connected')
        //     }
        //     this.ws.onclose = () => {
        //         console.log('disconnected')
        //         // automatically try to reconnect on connection loss
        
        //     }
        //     this.ws.onmessage = evt => {
        //         // listen to data sent from the websocket server
        //         const data = JSON.parse(evt.data)
        //         let check = data.check
        //         let number = data.number
        //         if (number === this.state.number) {
        //             this.setState(prevState => {
        //                 return {
        //                     checked: check
        //                 }
        //             })
        //         }
        //     }
            
        //     // document.querySelector('#checkbox').onChange = (e) => {
        //     //     // Add websocket functionality
        //     //     console.log("querySelect\n")
        //     //     this.ws.send(JSON.stringify({
        //     //         'checked': this.state.checked,
        //     //         'card_number': this.state.number
        //     //     }));
        //     //     this.setState({
        //     //         checked: true,
        //     //         turn: !this.state.turn
                    
        //     //     })
        //     //     console.log("turn : " , this.state.turn)
        //     // }
        // }
    }

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures 
     * constant reconnection if connection closes
     */
     connect = () => {
        // New method, stopped at 23:36
        // var wsStart = 'ws://'
        // if (window.location.protocol === 'https:') {
        //     wsStart = 'wss://'
        // }
        // var endpoint = wsStart + window.location.host + window.location.pathname
        // var ws = new WebSocket(endpoint) // New method
        var ws = new WebSocket('ws://localhost:8000/ws/game/');
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            var data = {
                "card_number": this.state.number,
                "checked": this.state.checked
            }
            ws.send(JSON.stringify(data))

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

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
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
            let check = data.checked
            let number = data.card_number
            if (number === this.state.number) {
                this.setState(prevState => {
                    return {
                        checked: check
                    }
                })
            }
        };
        //ws.extensions = "hello world"
        // ws.addEventListener()
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
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

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
        try {
            var data = {
                "card_number": this.state.number,
                "checked": this.state.checked
            }
            this.ws.send(JSON.stringify(data))
        } 
        catch (error) {
            console.log(error) // catch error
        }
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
                        id = "checkbox"
                        type = "checkbox"
						checked = {this.state.checked}
                        onChange={this.handleChange}
                        /><br/>

                <h5 className="card-text">{this.state.content.word}</h5><br/>
                </div>
                </div>
                :
                <div>
                    <br/>
                    <h5 className="card-text">{this.state.content.word}</h5>
                    <br/>
                </div>
                }
                

            </div>
        )
    }
}

export default Card