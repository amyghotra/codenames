import React, { Component } from 'react'
import Row from "../Row/Row"
import './OperativesGame.css'

class OperativesGame extends Component { // Still not 100% sure whether to change this to a class, or to just useState
    constructor() {
        super()
        this.state = {
            room_key: '',
            task: 'O',
            gameWords: '',
            redScore: 0,
            blueScore: 0,
            turn: true, // true = blue turn & false = red turn 

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

            revealedCards: [],
            selectedCards: [],

            currentTeam: null,
            currentPlayer: null,
            
            playerId: "",

            ws: null

        }
    }

    // For handling the players' submitting their guesses / word picks
    handleEndTurn = async () => {

        await this.changePlayers()

        this.websocket()
        this.state.ws.onopen = () => {
            this.state.ws.send(JSON.stringify({
                'nextTeam': this.state.currentTeam,
                'nextPlayer': this.state.currentPlayer.player_id
            }));
        }
        
    }
    
    changePlayers = async () => {
        console.log("changeplayers function")
        if(this.state.currentTeam === 'R') {
            this.setState({currentTeam: 'B'})
            this.setState({
                currentPlayer: this.state.blueOperatives[Math.floor(Math.random()*this.state.blueOperatives.length)]
            })
        } else if(this.state.currentTeam === 'B') {
            this.setState({currentTeam: 'R'})
            this.setState({
                currentPlayer: this.state.redOperatives[Math.floor(Math.random()*this.state.redOperatives.length)]
            })
        }
    }

    websocket = () => {
        console.log(this.state.gameid)
        console.log(this.state.room_key)
        let ws = new WebSocket(`ws://localhost:8000/ws/game/${this.state.gameid}`)
        
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
        this.setState({ws:ws})
        
    }

    setInitialPlayer = () => {
        console.log(this.state.currentTeam)
        if(this.props.currentPlayer === null) {
            if(this.state.blueOperatives.length > 0 && this.state.redOperatives.length === 0  ){
                this.setState({
                    currentTeam :'B',
                    currentPlayer: this.state.blueOperatives[0]
                }, this.props.updateRoundPlayers(this.state.currentTeam, this.state.currentPlayer))
                console.log(this.state.blueOperatives.length)
            } else if(this.state.redOperatives.length > 0 && this.state.blueOperatives.length === 0) {
                this.setState({
                    currentTeam :'R',
                    currentPlayer: this.props.redOperatives[0]
                }, this.props.updateRoundPlayers(this.state.currentTeam, this.state.currentPlayer))
                console.log("no blue ops yet")
                console.log(this.state.redOperatives.length)
            }
        }
    }

    setIntial = async () => {
        console.log("setinitial function")
        if(this.props.currentTeam === null) {
            let teams = ['R','B']
            this.setState({
                currentTeam: teams[Math.floor(Math.random()*teams.length)]
            }, this.setInitialPlayer)
        } else {
            console.log("it was already set")
            console.log(this.props.currentTeam)
        }

    }

    componentDidMount = async () => {
        this.websocket()
        await this.setIntial()
        console.log(this.props.currentPlayer)
        console.log(this.props.currentTeam)
    }

    componentDidUpdate = (event) => {

        if (event.gameWords !== this.props.gameWords) {
            this.setState(prevState => {
                return {
                    gameWords: this.props.gameWords,
                    room_key: this.props.room_key,
                    gameid: this.props.gameid,
                    redteamid: this.props.redteamid,
                    blueteamid: this.props.blueteamid
                }
            })
        }

        if (event.playersdata !== this.props.playersdata) {
            this.setState(prevState => {
                return {
                    playersdata: this.props.playersdata
                }
            })
        }
    }

    /*This one will call updatePlayers twice therefore adds it twice but will show normal when refreshed. 
        =>Fixed with the deleteRepeated() function    
    */
    componentWillReceiveProps = async (players) => {
        this.setState({
            playersdata: players.playersdata,
            currentPlayer: this.props.currentPlayer,
            currentTeam: this.props.currentTeam
        })
        this.updatePlayers(players.playersdata)
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

        for (let i = 0; i < players.length; i++) {
            //console.log("Current Player: ", players[i])
            if (players[i].room === room_key) {
                if (players[i].role === "S") {
                    if (players[i].team === "R") {
                        //console.log("It went here [Red Spy]: ", players[i])
                        let redSpymasters = this.state.redSpymasters
                        redSpymasters.push(players[i])
                        this.setState({
                            redSpymasters,
                        })

                    }
                    else if (players[i].team === "B") {
                        //console.log("It went here [Blue Spy]: ", players[i])
                        let blueSpymasters = this.state.blueSpymasters
                        blueSpymasters.push(players[i])
                        this.setState({
                            blueSpymasters
                        })

                    }
                }
                else if (players[i].role === "O") {
                    if (players[i].team === "R") {
                        //console.log("It went here [Red Op]: ", players[i])
                        let redOperatives = this.state.redOperatives
                        redOperatives.push(players[i])
                        this.setState({
                            redOperatives
                        })

                    }
                    else if (players[i].team === "B") {
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
    deleteRepeated = () => {
        let redOperatives = this.state.redOperatives
        let redSpymasters = this.state.redSpymasters
        let blueOperatives = this.state.blueOperatives
        let blueSpymasters = this.state.blueSpymasters
        let showredOperatives = this.state.showredOperatives
        let showredSpymasters = this.state.showredSpymasters
        let showblueOperatives = this.state.showblueOperatives
        let showblueSpymasters = this.state.showblueSpymasters

        //Red Operatives
        for (let i = 0; i < redOperatives.length; i++) {
            let repeated = false;
            for (let j = 0; j < showredOperatives.length; j++) {
                if (redOperatives[i].player_id === showredOperatives[j].player_id) {
                    repeated = true
                }
            }
            if (repeated === false) {
                showredOperatives.push(redOperatives[i])
                this.setState({
                    showredOperatives
                })
            }
        }//end of for loop

        //Red Spymasters
        for (let i = 0; i < redSpymasters.length; i++) {
            let repeated = false;
            for (let j = 0; j < showredSpymasters.length; j++) {
                if (redSpymasters[i].player_id === showredSpymasters[j].player_id) {

                    repeated = true
                }
            }
            if (repeated === false) {
                showredSpymasters.push(redSpymasters[i])
                this.setState({
                    showredSpymasters
                })
            }
        }

        //Blue Operative
        for (let i = 0; i < blueOperatives.length; i++) {
            let repeated = false;
            for (let j = 0; j < showblueOperatives.length; j++) {
                if (blueOperatives[i].player_id === showblueOperatives[j].player_id) {
                    repeated = true
                }
            }
            if (repeated === false) {

                showblueOperatives.push(blueOperatives[i])
                this.setState({
                    showblueOperatives
                })
            }
        }

        //Blue Spymasters
        for (let i = 0; i < blueSpymasters.length; i++) {
            let repeated = false;
            for (let j = 0; j < showblueSpymasters.length; j++) {
                if (blueSpymasters[i].player_id === showblueSpymasters[j].player_id) {
                    repeated = true
                }
            }
            if (repeated === false) {
                showblueSpymasters.push(blueSpymasters[i])
                this.setState({
                    showblueSpymasters
                })
            }
        }

    }

    saveSelection = (e,word) => {

        // this.props.increaseTeamPoints(e)

        let selected = [...this.state.selectedCards]
        selected.push(word)
        this.setState({selectedCards : selected})
        let allPlayed = [...this.state.revealedCards]
        allPlayed.push(word)
        this.setState({revealedCards: allPlayed})

    }

    render() {
        return (
            <div className="game">
                <br />
                <h6>OPERATORS</h6>
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
                                            {this.state.showredOperatives.map((player, index) => (
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
                                            {this.state.showblueOperatives.map((player, index) => (
                                                <li className="bulletContent" key={index}>{player.operative_screen_name}</li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">  {/* Changed back to div from a form */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="clueBody">
                                                <h5 className="clue">Clue: 1 Card(s) CURRENCY</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <Row task={this.state.task}
                                        rowWords={[this.state.gameWords[0],
                                        this.state.gameWords[1],
                                        this.state.gameWords[2],
                                        this.state.gameWords[3],
                                        this.state.gameWords[4]]}
                                        increaseTeamPoints={this.props.increaseTeamPoints} />
                                    <Row task={this.state.task}
                                        rowWords={[this.state.gameWords[5],
                                        this.state.gameWords[6],
                                        this.state.gameWords[7],
                                        this.state.gameWords[8],
                                        this.state.gameWords[9]]}
                                        increaseTeamPoints={this.props.increaseTeamPoints} />
                                    <Row task={this.state.task}
                                        rowWords={[this.state.gameWords[10],
                                        this.state.gameWords[11],
                                        this.state.gameWords[12],
                                        this.state.gameWords[13],
                                        this.state.gameWords[14]]}
                                        increaseTeamPoints={this.props.increaseTeamPoints} />
                                    <Row task={this.state.task}
                                        rowWords={[this.state.gameWords[15],
                                        this.state.gameWords[16],
                                        this.state.gameWords[17],
                                        this.state.gameWords[18],
                                        this.state.gameWords[19]]}
                                        increaseTeamPoints={this.props.increaseTeamPoints} />
                                    <Row task={this.state.task}
                                        rowWords={[this.state.gameWords[20],
                                        this.state.gameWords[21],
                                        this.state.gameWords[22],
                                        this.state.gameWords[23],
                                        this.state.gameWords[24]]}
                                        increaseTeamPoints={this.props.increaseTeamPoints} />

                                    {this.state.currentPlayer !== null && this.props.playerId === this.state.currentPlayer.user_id && <div className="row">
                                        <div className="col-md-12">
                                            <div className="d-flex justify-content-end">
                                                <button className="btn" onClick={this.handleEndTurn}>End Turn</button> {/*  onSubmit / onClick ? */}
                                            </div>
                                        </div>
                                    </div>}
                                </div>  {/* Changed back to div from a form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OperativesGame