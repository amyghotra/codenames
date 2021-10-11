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
            task: '',
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
        
        if(this.state.room_key !== null && this.state.nickname !== null && this.state.team !== null && this.state.task !== null) {
            axios.post('http://127.0.0.1:8000/codenames/userInfo', {
                room_key:this.props.location.state.room_key,
                nickname: this.state.nickname, 
                team: this.state.team,
                task: this.state.task
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
                    team: this.state.team,
                    task: this.state.task

                }
            }}/>
        }
    }

    setSpy = () => {
        this.setState({
            task: 'S'
        })
    }

    setOper = () => {
        this.setState({
            task: 'O'
        })
    }

    
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
                        <label className="prompt">Select task</label><br/>
                        <button className="task" type="button" onClick={this.setSpy}>spymaster</button><br/>
                        <button className="task" type="button" onClick={this.setOper}>operator</button>

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