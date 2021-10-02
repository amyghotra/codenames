import React, { Component } from 'react'
// import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './UserInfo.css'


class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            room_key: '',
            nickname: '',
            red_team: false,
            blue_team: false,
            spymaster: false,
            operator: false,
            redirect: false
        }
    }

    // componentDidMount = () => {
    //     axios.get('http://127.0.0.1:8000/codenames/userInfo').then(res => {
    //         console.log('this is the room key', this.props.location.state.room_key)
    //         this.setState({
    //             room_key: this.props.location.state.room_key
    //         })
    //     })
    // }


    // componentDidMount = () => {
    //     console.log('this is the room key', this.props.location.state.room_key)
    //     this.setState({
    //         room_key: this.props.location.state.room_key
    //     })
    // }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setRed = () => {
        this.setState({
            red_team: true,
            blue_team: false
        })
        console.log(this.red_team, this.blue_team)
    }

    setBlue = () => {
        this.setState({
            blue_team: true,
            red_team: false
        })
        console.log(this.red_team, this.blue_team)
    }

    submitUserInfo = () => {
        // console.log(this.setBlue)
        this.setState({
            redirect: true
        })
        console.log((this.state.redirect)? "true": "false")
        if(this.state.redirect === true){
            return <Redirect to={{
                pathname: '/game'
            }} />

        }
    }
        // axios.post('http://127.0.0.1:8000/codenames/userInfo', {} )

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

    // renderRedirect = () => {
    //     console.log(this.state.roomMatched, this.state.inputValue)
    //     if (this.state.redirect && this.state.roomMatched === true) {
    //         return <Redirect to={{
    //                     pathname: '/game',
    //                     state: {
    //                         room_key: this.state.inputValue
    //                     }    
    //                 }} />
    //     }
    // }
    
    render() {
        const text = this.state.red_team ? "Red team" : "Blue Team"
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
                        <p>{text}</p>
                        <input className="blue" type="button" onClick={this.setBlue}></input><br/>
                        
                    </div>
                    <button className="startBtn" onClick={this.submitUserInfo}>Start!</button>
                </form>
            </div>
        )
    }
}

export default UserInfo