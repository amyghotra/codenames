import React, {Component} from 'react'
import './Game.css'
import axios from 'axios'
import SpymastersGame from './Spymasters/SpymastersGame.js'
import OperativesGame from './Operatives/OperativesGame.js'


class Game extends Component {
    constructor() {
        super()
        this.state = {
            room_key: '',
            roomid: '',
            nickname: '',
            team: '',
            playerid: '',
            task: '',
            red_score: 0,
            blue_score: 0,
            gameid: '',
            gameData: '', 
            gameWords: '',
            doubleAgent: '',
            doubleAgentIndex: '',
            playersdata: '',
            agentClicked: false,

            redteamid: '',
            blueteamid: '',

            totalBlueCards: 0,
            totalRedCards: 0,

            winningTeam: '',
            losingTeam: '',

            winningScreenIsOpen: false,
            statusMessage:'',

            
        }
    }

    



    componentDidMount = async () =>{
        let gameWords = this.props.location.state.gameWords;
        for(let i = 0; i < gameWords.length; i++) {
            if(gameWords[i].category === 'D') {
                this.setState({
                    doubleAgent: gameWords[i],
                    doubleAgentIndex: i
                })
            }
        }
        this.setTotalCards(); 


        await axios.get('http://127.0.0.1:8000/codenames/players').then(res => {
            this.setState({
                playersdata: res.data
            })
            let playerExist = false;
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i].game_id === this.props.location.state.gameid && res.data[i].room === this.props.location.state.room_key && res.data[i].user_id === this.props.location.state.playerid) {
                    playerExist = true;
                }
            }

            if(playerExist === false) {
                axios.post('http://127.0.0.1:8000/codenames/players', {
                    operative_screen_name: this.props.location.state.nickname,
                    team: this.props.location.state.team,
                    role: this.props.location.state.task,
                    room: this.props.location.state.room_key,
                    game_id: this.props.location.state.gameid,
                    user_id: this.props.location.state.playerid
                }).then(response =>{
                    this.setState({
                        playersdata: [...this.state.playersdata, response.data]
                    })
                })
            }
        })
        this.setState({
            room_key: this.props.location.state.room_key,
            roomid: this.props.location.state.roomid,
            nickname: this.props.location.state.nickname,
            team: this.props.location.state.team,
            task: this.props.location.state.task,
            gameid: this.props.location.state.gameid,
            gameData: this.props.location.state.gameData,
            gameWords: this.props.location.state.gameWords,
            playerid: this.props.location.state.playerid,
            redteamid: this.props.location.state.redteamid,
            blueteamid: this.props.location.state.blueteamid,
        })

        this.updateGameWords(this.props.location.state.gameid)

        await axios.get(`http://127.0.0.1:8000/codenames/redTeam/${this.state.redteamid}`)
        .then(response => {
            this.setState({
                red_score:response.data.red_team_score
            })
        })
        await axios.get(`http://127.0.0.1:8000/codenames/blueTeam/${this.state.blueteamid}`)
        .then(response => {
            this.setState({
                blue_score:response.data.blue_team_score
            })
        })

        const localRedTeamId = localStorage.getItem(this.state.redteamid);
        const localBlueTeamId = localStorage.getItem(this.state.blueteamid);

        if(localRedTeamId && localBlueTeamId) {
            // console.log(localRedTeamId, localBlueTeamId);
            this.setState({
                red_score: Number(localRedTeamId),
                blue_score: Number(localBlueTeamId)
            })
        }

        /* Just in case of refresh */
        let totalBlueCards = this.state.totalBlueCards
        let totalRedCards = this.state.totalRedCards
        let redPoints = this.state.red_score
        let bluePoints = this.state.blue_score
        if(redPoints === totalRedCards){
            this.setState({
                winningTeam: "R",
                losingTeam: "B",
            }) 
            let winningTeam = "R"
            this.showPopUp(winningTeam)
        }
        else if(bluePoints === totalBlueCards){
            this.setState({
                winningTeam: "B",
                losingTeam: "R",
            })
            let winningTeam = "B"
            this.showPopUp(winningTeam)
        }
    }

    componentDidUpdate = () => {
        // await axios.get()
    }

    setDoubleAgent = () => {

        let doubleAgent = { ...this.state.doubleAgent}; 
        doubleAgent.category = this.state.team;
        let agentClicked = this.state.agentClicked;
        agentClicked = true;
        this.setState({
            doubleAgent,
            agentClicked
        })

        axios.put(`http://127.0.0.1:8000/codenames/games/word/${this.state.doubleAgent.word_id}`, doubleAgent)
            .then(res => {
                console.log(res)
                this.updateGameWords(this.state.gameid)
            })


        /*
            States affected: 
                totalRedCards, totalBlueCards
            Purpose: 
                when in spymaster view we need to make sure to add the double agent card to
                the it's new correspondings team total number of cards, which it won't do 
                in the setTotalCards. 
        */
        if(doubleAgent.category === 'R'){
            this.setState(prevState => {
                return {
                    totalRedCards: prevState.totalRedCards+1,
                }
            })
        }
        else if(doubleAgent.category === 'B'){
            this.setState(prevState => {
                return {
                    totalBlueCards: prevState.totalBlueCards+1,
                }
            })
        }
    }

    updateGameWords = (gameid) => {
        axios.get(`http://127.0.0.1:8000/codenames/games/${gameid}`).then(res => {
            this.setState({ 
                gameWords: res.data.gameWords 
            })
        
        })
    }

    //from the card component, the words id and its corresponding team will be sent here to increase the points and change the guess to true accordingly
    increaseTeamPoints = (team, word) => {
        let totalBlueCards = this.state.totalBlueCards
        
        let totalRedCards = this.state.totalRedCards
        let redPoints = this.state.red_score
        let bluePoints = this.state.blue_score
        if(team === 'R'){
            let wordObj = this.state.gameWords.find(w => w.word_id === word);
            if(wordObj.guessed === false) {
                this.setState(prevState => {
                    return {
                        red_score: prevState.red_score+1,
                    }
                })
                redPoints += 1
    
                localStorage.setItem(this.state.redteamid, JSON.stringify(redPoints));

                axios.patch(`http://127.0.0.1:8000/codenames/games/word/${word}`, {guessed:true}).then(response => {
                    console.log(response.data)
                })
                axios.patch(`http://127.0.0.1:8000/codenames/redTeam/${this.state.redteamid}`, {red_team_score: redPoints}).then(response => {
                    console.log(response.data)
                })
            }
            
        }
        else if(team === 'B'){
            let wordObj = this.state.gameWords.find(w => w.word_id === word);
            if(wordObj.guessed === false) {
                this.setState(prevState => {
                    return {
                        blue_score: prevState.blue_score+1,
                    }
                })
                bluePoints += 1

                localStorage.setItem(this.state.blueteamid, JSON.stringify(bluePoints));

                axios.patch(`http://127.0.0.1:8000/codenames/games/word/${word}`, {guessed:true}).then(response => {
                    console.log(response.data)
                })
                axios.patch(`http://127.0.0.1:8000/codenames/blueTeam/${this.state.blueteamid}`, {blue_team_score: bluePoints}).then(response => {
                    console.log(response.data)
                })


            }
        }

        if(redPoints === totalRedCards){
            this.setState({
                winningTeam: "R",
                losingTeam: "B",
            }) 
            let winningTeam = "R"
            this.showPopUp(winningTeam)
        }
        else if(bluePoints === totalBlueCards){
            this.setState({
                winningTeam: "B",
                losingTeam: "R",
            })
            let winningTeam= "B"
            this.showPopUp(winningTeam)
        }
        
    }

    /*
        States affected: 
            totalRedCards, totalBlueCards
        Purpose: 
            at the beggining of the game we want to go through all the cards and be able to 
            see how many of them are assigned to the blue team and how many are assigned to the red team.
            Operatives View: Will have one team have 8 and the other have 9
            Spymasters View: Will have both teams have 8 and this will be fixed to one team having nine 
                             in the setDoubleAgent function.
    */
    setTotalCards = () => {
        let gameWords = this.props.location.state.gameWords;
        for(let i = 0; i < gameWords.length; i++) {
            if(gameWords[i].category === 'R') {
                // this.setState({
                //     doubleAgent: gameWords[i],
                //     doubleAgentIndex: i
                // })
                this.setState(prevState => {
                    return {
                        totalRedCards: prevState.totalRedCards+1,
                    }
                })
            }
            else if(gameWords[i].category === 'B') {
                // this.setState({
                //     doubleAgent: gameWords[i],
                //     doubleAgentIndex: i
                // })
                this.setState(prevState => {
                    return {
                        totalBlueCards: prevState.totalBlueCards+1,
                    }
                })
            }
        }
        //this.showPopUp()
    }
    showPopUp = (winningTeam) => {
        //let winningScreenIsOpen = this.state.winningScreenIsOpen
        let team = this.props.location.state.team
        console.log(winningTeam)
        //console.log(winningScreenIsOpen)

        //if there is a winning team
        if(winningTeam !== ""){
            this.setState({
                winningScreenIsOpen: true
            })//this works

            if(winningTeam === "R"){
                if(team === 'R'){
                    //console.log("winning team is R has been called!")
                    //let statusMessage = 'CONGRATS! YOUR TEAM WON!'
                    this.setState({
                        statusMessage: 'CONGRATS! YOUR TEAM WON!'
                    })
                }
                else if(team === 'B'){
                    //console.log("winning team is Blue has been called!")
                    //let statusMessage = 'SORRY! YOUR TEAM LOST!'
                    this.setState({
                        statusMessage: 'SORRY! YOUR TEAM LOST!'
                    })
                }
            }
            else if (winningTeam === "B"){
                //console.log("winning team is B has been called!")
                if(team === 'B'){
                    console.log("winning team is Blue has been called!")
                    this.setState({
                        statusMessage: 'CONGRATS! YOUR TEAM WON!'
                    })
                }
                else if(team === 'R'){
                    this.setState({
                        statusMessage: 'SORRY! YOUR TEAM LOST!'
                    })
                }
            }
        }
    }

    render() {
        
        return(
            <div>
                {
                    this.state.task === 'S' ?
                    
                    <div>
                        {
                        this.state.agentClicked === false ?
                        <div>
                            <button onClick={this.setDoubleAgent}>I WANT FIRST</button> 
                            <SpymastersGame 
                                room_key = {this.state.room_key}
                                gameWords = {this.state.gameWords}
                                increaseTeamPoints = {this.increaseTeamPoints}
                                redPoints = {this.state.red_score}
                                bluePoints = {this.state.blue_score}
                                playersdata = {this.state.playersdata}
                                gameid = {this.state.gameid}
                                winningScreenIsOpen = {this.state.winningScreenIsOpen}
                                statusMessage= {this.state.statusMessage}
                            />
                        </div>

                        :

                        <div>
                            <SpymastersGame 
                                room_key = {this.state.room_key}
                                gameWords = {this.state.gameWords}
                                increaseTeamPoints = {this.increaseTeamPoints}
                                redPoints = {this.state.red_score}
                                bluePoints = {this.state.blue_score}
                                playersdata = {this.state.playersdata}
                                gameid = {this.state.gameid}
                                winningScreenIsOpen = {this.state.winningScreenIsOpen}
                                statusMessage= {this.state.statusMessage}
                                
                            />
                        </div>
                        }
                    </div>
                    : 

                    <OperativesGame 
                        room_key = {this.state.room_key}
                        gameWords = {this.state.gameWords}
                        increaseTeamPoints = {this.increaseTeamPoints}
                        redPoints = {this.state.red_score}
                        bluePoints = {this.state.blue_score}
                        playersdata = {this.state.playersdata}
                        winningScreenIsOpen = {this.state.winningScreenIsOpen}
                        statusMessage= {this.state.statusMessage}
                        
                    />
                }
            </div>
        )
    }
}

export default Game