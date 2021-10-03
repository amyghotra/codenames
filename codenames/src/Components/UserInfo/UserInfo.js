import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './UserInfo.css'


class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            room_key: '',
            nickname: '',
            team: '',
            spymaster: false,
            operator: false,
            redirect: false
        }
    }

    componentDidMount = () => {     
        this.setState({
            room_key: this.props.location.state.room_key
        })
    }



    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setRed = () => {
        this.setState({
            team: 'R'
        })
    }

    setBlue = () => {
        this.setState({
            team: 'B'
        })
    }

   
    submitUserInfo = () => {
        console.log(this.state.room_key)
        
        if(this.state.room_key !== null && this.state.nickname !== null && this.state.team !== null) {
            axios.post('http://127.0.0.1:8000/codenames/userInfo', {
                room_key:this.props.location.state.room_key,
                nickname: this.state.nickname, 
                team: this.state.team
            })
            .then(repsonse => {
                console.log(repsonse)
                this.setState({
                    redirect: true
                })
            })
            .catch(error => {
                console.log(error)
            })
        }

    }

    renderRedirect = () => {
        if(this.state.redirect){
            console.log(this.state.nickname)
            return <Redirect to={{
                pathname: '/game',
                state: {
                    room_key: this.state.room_key,
                    nickname: this.state.nickname,
                    team: this.state.team

                }
            }}/>
        }
    }


    // submitRoomKey = (randomRoomKey) => {
    //     axios.post('http://127.0.0.1:8000/codenames/userInfo', {room_key: randomRoomKey}    )
    //         .then(response => {
    //             console.log(response)
    //             this.setState({
    //                 roomMatched: true,
    //                 inputValue: randomRoomKey,
    //                 redirect: true
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         }) 
    // }

    // submitInput = () => {
    //     for(let i = 0; i < this.state.data.length; i++) {
    //         if(this.state.data[i].room_key === this.state.inputValue) {
    //             this.setState(prevState => {
    //                 return {
    //                     roomMatched: !prevState.roomMatched
    //                 }
    //             })
    //             this.setState({
    //                 redirect: true
    //             })
    //         }
    //     }
    // }

    
    render() {
        
        // const text = this.state.blue_team ? "blue team" : "red Team"
        return(
            <div className="userInfo">
                <br />
                <h6 className="gameCode"> Game Code: {this.state.room_key} </h6>
                <form className="container">
                    <div className="box-userInfo-left">
                        <label className="prompt">Enter nickname</label><br/><br/>
                        <input 
                        className="nickname" 
                        value={this.state.nickname}
                        name= "nickname"
                        type="text" 
                        placeholder="Nickname" 
                        spellCheck="false" 
                        onChange={this.handleChange}/><br/>
                        {/* <label className="prompt">job</label><br/>
                        <input className="red" type="button" placeholder="spymaster"></input><br/>
                        <input className="blue" type="button" placeholder="operator"></input><br/> */}
                    </div>
                    <div className="box-userInfo-right">
                        <label className="prompt">Choose a team</label><br/>
                        <input className="red" type="button" onClick={this.setRed}></input><br/>
                        {/* <p>{text}</p> */}
                        <input className="blue" type="button" onClick={this.setBlue}></input><br/>
                        
                    </div>
                    {this.renderRedirect()}
                    <button className="startBtn" type="button" onClick={this.submitUserInfo}>Start!</button>
                </form>
            </div>
        )
    }
}

export default UserInfo