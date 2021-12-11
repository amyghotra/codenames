import React, { Component } from 'react'
import Row from "../Row/Row"
import './SpymastersGame.css'


class SpymastersGame extends Component{ // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {
            room_key: '',
            task: 'S',
            gameid: '',
            gameWords: '',
            playersdata: '',
            spymasterClueWord: 'WAITING FOR CLUE...', 
            spymasterClueCount: 0,

            redScore: 0,
            blueScore: 0,

            redteamid: '',
            blueteamid: '',

            //Helper Variables
            redOperatives: [],
            redSpymasters: [],
            blueOperatives: [],
            blueSpymasters: [],
            renderPlayers: false,

            //Show Variables
            showredOperatives: [],
            showredSpymasters: [],
            showblueOperatives: [],
            showblueSpymasters: [],

            //Websocket
            ws: null
        }
        // Need these statements since they set state - or use xxx = () => {}
        this.incrementClueCount = this.incrementClueCount.bind(this);
        this.decrementClueCount = this.decrementClueCount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.socketSend = this.socketSend.bind(this);
    }

    componentDidMount = () => {
    } // Don't add this.connect()

    socketSend = () => {
        let clueword = this.state.spymasterClueWord
        let cheater_flag = 0
        if (clueword.length > 16) { // Restrict the amount of chars sent
            clueword = clueword.slice(0, 16)
        }
        clueword = clueword.toUpperCase()
        for (let i = 0; i < this.state.gameWords.length; i++) {
            // Search if the clue matches any of the game words
            if (clueword.search(this.state.gameWords[i].word) !== -1) {
                cheater_flag = 1
                break
            }
        }
        if (cheater_flag === 1) { // If cheating
            this.setState(prevState => {
                return {
                    spymasterClueWord: "NO CHEATING!" // No cheating!
                }
            })
        }
        else { // Finally, send regularly
            var data = {
                "count": this.state.spymasterClueCount,
                "clue": clueword
            }
            this.state.ws.send(JSON.stringify(data)) // send to channel
            // console.log(data)
        }
    }

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures 
     * constant reconnection if connection closes
     */
     connect = () => {
        var ws = new WebSocket('ws://localhost:8000/cluebox/cluebox/' + this.props.gameid + '/');
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            // console.log("connected websocket main component");
            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            // clearTimeout(connectInterval); // clear Interval on on open of websocket connection
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
            // console.log(data)
            // console.log("received clue!")
            let count = data.count
            let clue = data.clue
            this.setState(prevState => {
                return {
                    spymasterClueCount: count,
                    spymasterClueWord: clue
                }
            })
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
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };


    /*
        states affected: 
            gameWords
        what it does: 
            The first parameter for this method is gameWords before the update; so, testing 
            whether it has changed is done here. If it has changed then it will update the 
            gameWords to how the game component has them. 
    */
    componentDidUpdate = (event) => {

        if (event.gameWords !== this.props.gameWords) {
            this.setState(prevState => {
                return {
                    gameWords: this.props.gameWords,
                    room_key: this.props.room_key,
                    gameid: this.props.gameid,
                    
                }
            })
            if (this.state.ws === null) {
                this.connect();
            }
        }

        if(event.playersdata !== this.props.playersdata){
            this.setState(prevState =>{
                return{
                    playersdata: this.props.playersdata
                }
            })
        }

    }

    /*This one will call updatePlayers twice therefore adds it twice but will show normal when refreshed. 
        =>Fixed with the deleteRepeated() function    
    */
    componentWillReceiveProps = (players) => {
        this.setState({
            playersdata: players.playersdata,
            //renderPlayers: true,
        })
        //console.log(players)

        // console.log("Checking how many times this will call the update players!")
        this.updatePlayers(players.playersdata)
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
    handleGuessSubmit = () => {
        // console.log(this.state.spymasterClueWord, this.state.spymasterClueCount)
    }
    incrementClueCount = () => {
        if (this.props.team === 'R') {
            if (this.state.spymasterClueCount + 1 <= 8 - (this.props.redPoints) + 
               (this.state.gameWords[this.props.doubleAgentIndex].category === 'R')) {
                this.setState(prevState => { // Update with inline function
                    return {
                        spymasterClueCount: prevState.spymasterClueCount + 1
                    }
                })
            }
        }
        else if (this.props.team === 'B') {
            if (this.state.spymasterClueCount + 1 <= 8 - (this.props.bluePoints) + 
               (this.state.gameWords[this.props.doubleAgentIndex].category === 'B')) {
                this.setState(prevState => { // Update with inline function
                    return {
                        spymasterClueCount: prevState.spymasterClueCount + 1
                    }
                })
            }
        }
    }
    decrementClueCount = () => {
        if (this.state.spymasterClueCount - 1 >= 0) {
            this.setState(prevState => {
                return {
                    spymasterClueCount: prevState.spymasterClueCount - 1
                }
            })
        }
    }

    /*Issues: Being called twice so it adds double the amount until you refresh the page.
        =>Fixed with the deleteRepeated() function    
    */
    updatePlayers = (players) => {
        //console.log('Update Players Called!');
        let room_key = this.props.room_key;
        //let players = this.props.playersdata;
        // console.log("Players data: ", players)
        //if(this.state.renderPlayers === true){

        for(let i = 0; i < players.length; i++){
            //console.log("Current Player: ", players[i])
            if(players[i].room === room_key){
                if(players[i].role === "S" ){
                    if(players[i].team === "R"){
                        //console.log("It went here [Red Spy]: ", players[i])
                        let redSpymasters = this.state.redSpymasters
                        redSpymasters.push(players[i])
                        this.setState({
                            redSpymasters,
                        })
                        
                    }
                    else if(players[i].team === "B"){
                        //console.log("It went here [Blue Spy]: ", players[i])
                        let blueSpymasters = this.state.blueSpymasters
                        blueSpymasters.push(players[i])
                        this.setState({
                            blueSpymasters
                        })
                        
                    }
                }
                else if(players[i].role === "O"){
                    if(players[i].team === "R"){
                        //console.log("It went here [Red Op]: ", players[i])
                        let redOperatives = this.state.redOperatives
                        redOperatives.push(players[i])
                        this.setState({
                            redOperatives
                        })
                        
                    }
                    else if(players[i].team === "B"){
                        //console.log("It went here [Blue Op]: ", players[i])
                        let blueOperatives = this.state.blueOperatives
                        blueOperatives.push(players[i])
                        this.setState({
                            blueOperatives
                        })
                        
                    }
                    
                }
            
            }
        }
        //}

        this.deleteRepeated()
    }

    //This fixes the issue of having repeated players on intial load. 
    deleteRepeated = ()=> {
        let redOperatives = this.state.redOperatives
        let redSpymasters = this.state.redSpymasters
        let blueOperatives = this.state.blueOperatives
        let blueSpymasters = this.state.blueSpymasters
        let showredOperatives = this.state.showredOperatives
        let showredSpymasters = this.state.showredSpymasters
        let showblueOperatives = this.state.showblueOperatives
        let showblueSpymasters = this.state.showblueSpymasters
        

        //Red Operatives
        for (let i = 0; i < redOperatives.length; i++){
            let repeated = false;
            for (let j = 0; j < showredOperatives.length; j++){
                if(redOperatives[i].player_id === showredOperatives[j].player_id){
                    repeated = true
                }
            }
            if (repeated === false){
                showredOperatives.push(redOperatives[i])
                this.setState({
                    showredOperatives
                })
            }
        }//end of for loop

        //Red Spymasters
        for (let i = 0; i < redSpymasters.length; i++){
            let repeated = false;
            for (let j = 0; j < showredSpymasters.length; j++){
                if(redSpymasters[i].player_id === showredSpymasters[j].player_id){
                    repeated = true
                }
            }
            if (repeated === false){
                showredSpymasters.push(redSpymasters[i])
                this.setState({
                    showredSpymasters
                })
            }
        }

        //Blue Operative
        for (let i = 0; i < blueOperatives.length; i++){
            let repeated = false;
            for (let j = 0; j < showblueOperatives.length; j++){
                if(blueOperatives[i].player_id === showblueOperatives[j].player_id){
                    repeated = true
                }
            }
            if (repeated === false){
                showblueOperatives.push(blueOperatives[i])
                this.setState({
                    showblueOperatives
                })
            }
        }

        //Blue Spymasters
        for (let i = 0; i < blueSpymasters.length; i++){
            let repeated = false;
            for (let j = 0; j < showblueSpymasters.length; j++){
                if(blueSpymasters[i].player_id === showblueSpymasters[j].player_id){
                    repeated = true
                }
            }
            if (repeated === false){
                showblueSpymasters.push(blueSpymasters[i])
                this.setState({
                    showblueSpymasters
                })
            }
        }

    }

   

    render() {
        
        
        return(
            <div>
                {(this.state.showredOperatives.length >= 1 && this.state.showblueOperatives.length >=1 && 
                  this.state.showredSpymasters.length === 1 && this.state.showblueSpymasters.length === 1) && 
                  (this.props.agentClicked === true || this.props.gameWords[this.props.doubleAgentIndex].category !== 'D') ?
                    <div className="game" >
                        <br />
                        <h6>SPYMASTERS</h6>
                        <h6 className="gameCode"> Game Code: {this.props.room_key} </h6>
                        <div className="currentPlayer">
                            {this.props.currentPlayer ? <h6> <strong>Current Player:</strong> {this.props.currentPlayer.operative_screen_name}</h6> : null}
                            
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="gameScores">
                                                <div className={this.props.currentTeam === 'R' ? "redTeam-selected" : "redTeam"}>
                                                    <div>
                                                
                                                        <h6 className="teamTitle">Red Team</h6>
                                                        <h6 className="teamScore">{this.props.redPoints}</h6>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <h6 className="teamContent"> Spymaster:</h6>
                                                        {this.state.showredSpymasters.map((player, index) => (
                                                            <li className="bulletContent" key={index}>{player.operative_screen_name}</li>
                                                        ))}
                                                        {this.showRedSpymasters}
                                                    
                                                    <h6 className="teamContent"> Operatives:</h6>
                                                        {this.state.showredOperatives.map((player, index )=> (
                                                            <li className="bulletContent" key={index}>{player.operative_screen_name}</li>
                                                        ))}
                                                </div>
                                                <br />
                                                <div className={this.props.currentTeam === 'B' ? "blueTeam-selected" : "blueTeam"}>
                                                    <div>
                                                        <h6 className="teamTitle">Blue Team</h6>
                                                        <h6 className="teamScore">{this.props.bluePoints}</h6>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <h6 className="teamContent"> Spymaster:</h6>
                                                        {this.state.showblueSpymasters.map((player, index) => (
                                                            <li className="bulletContent" key={index}>{player.operative_screen_name}</li>
                                                        ))}
                                                    <h6 className="teamContent"> Operatives:</h6>
                                                        {this.state.showblueOperatives.map((player, index)=> (
                                                            <li className="bulletContent" key={index}>{player.operative_screen_name}</li>
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
                                                            cardNumbers={[0,1,2,3,4]} // Add in card numbers to distinguish
                                                            gameid={this.state.gameid} // Add in gameid for card websocket
                                                            increaseTeamPoints={this.props.increaseTeamPoints} />
                                                        <Row task={this.state.task}
                                                            rowWords={[this.state.gameWords[5],
                                                            this.state.gameWords[6],
                                                            this.state.gameWords[7],
                                                            this.state.gameWords[8],
                                                            this.state.gameWords[9]]}
                                                            cardNumbers={[5,6,7,8,9]}
                                                            gameid={this.state.gameid} // Add in gameid for card websocket
                                                            increaseTeamPoints={this.props.increaseTeamPoints} />
                                                        <Row task={this.state.task}
                                                            rowWords={[this.state.gameWords[10],
                                                            this.state.gameWords[11],
                                                            this.state.gameWords[12],
                                                            this.state.gameWords[13],
                                                            this.state.gameWords[14]]}
                                                            cardNumbers={[10,11,12,13,14]}
                                                            gameid={this.state.gameid} // Add in gameid for card websocket
                                                            increaseTeamPoints={this.props.increaseTeamPoints} />
                                                        <Row task={this.state.task}
                                                            rowWords={[this.state.gameWords[15],
                                                            this.state.gameWords[16],
                                                            this.state.gameWords[17],
                                                            this.state.gameWords[18],
                                                            this.state.gameWords[19]]}
                                                            cardNumbers={[15,16,17,18,19]}
                                                            gameid={this.state.gameid} // Add in gameid for card websocket
                                                            increaseTeamPoints={this.props.increaseTeamPoints} />
                                                        <Row task={this.state.task}
                                                            rowWords={[this.state.gameWords[20],
                                                            this.state.gameWords[21],
                                                            this.state.gameWords[22],
                                                            this.state.gameWords[23],
                                                            this.state.gameWords[24]]}
                                                            cardNumbers={[20,21,22,23,24]}
                                                            gameid={this.state.gameid} // Add in gameid for card websocket
                                                            increaseTeamPoints={this.props.increaseTeamPoints} />
    
                                                    </div>
                                                </div>
                                                {/* <div className="row"> */}
                                                    <div className="col-md-12">
                                                        {!this.props.winningScreenIsOpen ? 
                                                        <form>
                                                            {this.props.myTeam === this.props.currentTeam &&
                                                            <div className="spymasterClue">
                                                                <div className= "clueInput">
                                                                <input
                                                                    type="text"
                                                                    id="clueTextBox"
                                                                    value={this.state.spymasterClueWord}
                                                                    name="spymasterClueWord" // Must be same name as state!
                                                                    placeholder="Type clue here"
                                                                    onChange={this.handleChange}
                                                                />
                                                                </div>
                                                                <div className="counter">
                                                                    {/* type = "button" to NOT make it submit the form */}
                                                                    <button type="button" onClick={this.incrementClueCount}>+</button>
                                                                    <h6>{this.state.spymasterClueCount}</h6>
                                                                    <button type="button" onClick={this.decrementClueCount}>-</button>
                                                                </div>
    
                                                                {/* <input type="button" onClick={this.socketSend}>Submit Clue</input> */}
                                                                <input id="clueSubmissionButton" className="clueContainer" type="button" onClick={this.socketSend} value="Submit"/>
    
                                                            </div>}
                                                        </form>
                                                        :
                                                        <div className="popContainer" >
                                                            <div className="winBox">
                                                                {this.props.team === this.props.winningTeam ? 
                                                                <div className="won">
                                                                    <h4 className="Status">CONGRATS! YOUR TEAM WON!</h4>
                                                                </div>
                                                                :
                                                                <div className="lost">
                                                                    <h4 className="Status">SORRY! YOUR TEAM LOST!</h4>
                                                                </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                {/* </div> */}
                                            </div> {/* Changed back to div from a form */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div> 
                    :
                    <div>
                        <div className="waitingScreen">
                            <div className= "waitingContainer">
                                <div class="spinner"></div>
                                <h4 className="waitingText">
                                    Waiting for players
                                    <span class="one">.</span><span class="two">.</span><span class="three">.</span>
                                </h4>
                                <button className="waitingButton" onClick={this.props.setDoubleAgent}>I want first</button>
                            </div>
                        </div>
                    </div>
                } 

            </div>

        

        )
    }
}

export default SpymastersGame