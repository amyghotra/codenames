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
            spymasterClueWord: '',
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

            ws: null
        }

        // this.chatSocket = this.chatSocket.bind(this)
        this.handleGuessSubmit = this.handleGuessSubmit.bind(this)
        this.incrementClueCount = this.incrementClueCount.bind(this)
        this.decrementClueCount = this.decrementClueCount.bind(this)

    }

    websocket = () => {
        console.log(this.state.gameid)
        console.log(this.state.room_key)
        let ws = new WebSocket(`ws://localhost:8000/ws/game/${this.state.gameid}`)
        this.setState({ws:ws})
        ws.onopen = () => {
            console.log("connected websocket main component")
        };
        ws.onmessage = e => {
            console.log("inside ws.onmessage")
            const data = JSON.parse(e.data)
            console.log(data)
        }
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
        
    }

    componentDidMount = () => {
        this.websocket()
    }

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
                    gameid: this.props.gameid
                }
            })
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
            currentPlayer: this.props.currentPlayer,
            currentTeam: this.props.currentTeam
            //renderPlayers: true,
        })
        //console.log(players)

        console.log("Checking how many times this will call the update players!")
        this.updatePlayers(players.playersdata)
    }

    // For changing state when elements are changed on the page by user
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            spymasterClueWord: event.target.value
        });
    }
    // For handling the players' submitting their guesses / word picks
    handleGuessSubmit = () => {
        console.log(this.state.spymasterClueWord, this.state.spymasterClueCount)
        console.log(this.state.gameid)
        console.log(this.state.room_key)

        this.state.ws.onopen = () => {
            this.state.ws.send(JSON.stringify({
                'clueWord': this.state.spymasterClueWord,
                'clueCount': this.state.spymasterClueCount
                
            }));
            console.log("connected websocket main component")
        };
    }
    incrementClueCount = () => {
        this.setState(prevState => { // Update with inline function
            return {
                spymasterClueCount: prevState.spymasterClueCount + 1
            }
        })
    }
    decrementClueCount = () => {
        this.setState(prevState => {
            return {
                spymasterClueCount: prevState.spymasterClueCount - 1
            }
        })
    }

    /*Issues: Being called twice so it adds double the amount until you refresh the page.
        =>Fixed with the deleteRepeated() function    
    */
    updatePlayers = (players) => {
        //console.log('Update Players Called!');
        let room_key = this.props.room_key;
        //let players = this.props.playersdata;
        console.log("Players data: ", players)
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
                                            <h6 className="teamScore">{this.props.redPoints}</h6>
                                        </div>
                                        <br />
                                        <br />
                                        <h6 className="teamContent"> Spymasters:</h6>
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
                                    <div className="blueTeam">
                                        <div>
                                            <h6 className="teamTitle">Blue Team</h6>
                                            <h6 className="teamScore">{this.props.bluePoints}</h6>
                                        </div>
                                        <br />
                                        <br />
                                        <h6 className="teamContent"> Spymasters:</h6>
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
                                                this.state.gameWords[4]]} />
                                            <Row task={this.state.task}
                                                rowWords={[this.state.gameWords[5],
                                                this.state.gameWords[6],
                                                this.state.gameWords[7],
                                                this.state.gameWords[8],
                                                this.state.gameWords[9]]} />
                                            <Row task={this.state.task}
                                                rowWords={[this.state.gameWords[10],
                                                this.state.gameWords[11],
                                                this.state.gameWords[12],
                                                this.state.gameWords[13],
                                                this.state.gameWords[14]]} />
                                            <Row task={this.state.task}
                                                rowWords={[this.state.gameWords[15],
                                                this.state.gameWords[16],
                                                this.state.gameWords[17],
                                                this.state.gameWords[18],
                                                this.state.gameWords[19]]} />
                                            <Row task={this.state.task}
                                                rowWords={[this.state.gameWords[20],
                                                this.state.gameWords[21],
                                                this.state.gameWords[22],
                                                this.state.gameWords[23],
                                                this.state.gameWords[24]]} />
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
                                                        <button type="button" onClick={this.incrementClueCount}>+</button>
                                                        <h6>{this.state.spymasterClueCount}</h6>
                                                        <button type="button" onClick={this.decrementClueCount}>-</button>
                                                    </div>
                                                    <input type='button' onClick={this.handleGuessSubmit} />
                                                    {/* <button onClick={this.handleGuessSubmit}>Submit Clue</button> */}
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
