import React, { Component } from 'react'
import './Landing.css'
// import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {GrClose} from 'react-icons/gr'
import axios from 'axios';
// import UserInfo from '../UserInfo/UserInfo';



class Landing extends Component {
    constructor() {
        super()
        this.state = {
            howToIsOpen: false,
            data: '',
            inputValue: '',
            roomMatched: false,
            redirect: false,
            roomKey: '',
            roomid: ''
        }
    }


    setHowToIsOpen = () => {
        this.setState(prevState => {
            return{
                howToIsOpen: !prevState.howToIsOpen
            }
        })
    }

    componentDidMount = () => {
        axios.get('https://codenames21-backend.herokuapp.com/').then(res => {
            this.setState({ data: res.data })
        })
    }

    generateRoomKey = () => {
        let randomRoomKey = '';
        let characters = '0123456789';
        for(let i = 0; i < 5; i++) {
            randomRoomKey += characters.charAt(Math.floor(Math.random() * 10));
        }
        let sameKey = false;
        for(let i = 0; i < this.state.data.length; i++) {
            if(this.state.data[i] === randomRoomKey) {
                sameKey = true;
            }
        }
        if(sameKey === true) {
            this.generateRoomKey();
        }
        else {
            this.submitRoomKey(randomRoomKey);
        }    
    }

    submitRoomKey = (randomRoomKey) => {
        axios.post('https://codenames21-backend.herokuapp.com/codenames/', {room_key: randomRoomKey}    )
            .then(response => {
                this.setState({
                    roomMatched: true,
                    inputValue: randomRoomKey,
                    redirect: true,
                    roomid: response.data.id
                })
            })
            .catch(error => {
                console.log(error)
            }) 
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }


    submitInput = () => {
        for(let i = 0; i < this.state.data.length; i++) {
            if(this.state.data[i].room_key === this.state.inputValue) {
                this.setState(prevState => {
                    return {
                        roomMatched: !prevState.roomMatched,
                        roomid: this.state.data[i].id
                    }
                })
                this.setState({
                    redirect: true
                })
            }
        }
    }

    renderRedirect = () => {
        if (this.state.redirect && this.state.roomMatched === true) {
            return <Redirect to={{
                        pathname: '/userinfo',
                        state: {
                            room_key: this.state.inputValue,
                            roomid: this.state.roomid
                        }    
                    }} />
        }
    }

    render() {

    
        return (
            <div className="Landing" >
                <h4 className="game-title">CODENAMES</h4>
                {!this.state.howToIsOpen ? 
                        <div className="box">
                            {this.renderRedirect()}
                            <button className="btn1" onClick={this.generateRoomKey}>Create Room</button>

                            <br></br>

                            <div className="input-group mb-3">
                                <input type="text" 
                                className="form-control" 
                                placeholder="Room Key" 
                                aria-label="Room Key" 
                                aria-describedby="basic-addon2" 
                                value={this.state.inputValue} 
                                onChange={this.handleChange}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={this.submitInput}>Join</button>
                                </div>
                            </div>

                            <br></br>

                            <button className="btn1" onClick={this.setHowToIsOpen}> How to play</button>
                            
                        </div>
                        : 
                        <div className="popUp" >
                            <GrClose className="btn-close" onClick={this.setHowToIsOpen}/>
                            <h4 className="howTo">How to play</h4>
                            <h6 className="explanation">
                                Codenames is a game of guessing which codenames (i.e., words) in a set are related to a hint-word given by another player.<br/>
                                <br/>
                                Players split into two teams: red and blue. One player of each team is selected as the team's spymaster; the others are field operatives.<br/>
                                <br/>
                                Twenty-five Codename cards, each bearing a word, are laid out in a 5×5 grid, in random order. A number of these words represent red agents, a number represent blue agents, one represents an assassin, and the others represent innocent bystanders.<br/>
                                <br/>
                                The teams' spymasters are given a randomly-dealt map card showing a 5×5 grid of 25 squares of various colors, each corresponding to one of the code name cards on the table. Teams take turns. On each turn, the appropriate spymaster gives a verbal hint about the words on the respective cards. Each hint may only consist of one single word and a number. The spymaster gives a hint that is related to as many of the words on his/her own agents' cards as possible, but not to any others – lest they accidentally lead their team to choose a card representing an innocent bystander, an opposing agent, or the assassin.<br/>
                                <br/>
                                The hint's word can be chosen freely, as long as it is not (and does not contain, nor is contained in) any of the words on the code name cards still showing at that time. Code name cards are covered as guesses are made.<br/>
                                <br/>
                                After a spymaster gives the hint with its word and number, their field operatives make guesses about which code name cards bear words related to the hint and point them out, one at a time. When a code name card is pointed out, the spymaster covers that card with an appropriate identity card – a blue agent card, a red agent card, an innocent bystander card, or the assassin card – as indicated on the spymasters' map of the grid. If the assassin is pointed out, the game ends immediately, with the team who identified him losing. If an agent of the other team is pointed out, the turn ends immediately, and that other team is also one agent closer to winning. If an innocent bystander is pointed out, the turn simply ends. <br/>
                                <br/>
                                The game ends when all of one team's agents are identified (winning the game for that team), or when one team has identified the assassin (losing the game).<br/>
                            </h6>
                        </div>
                }
            </div>
        )
    }
}

export default Landing