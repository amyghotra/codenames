import React, { Component } from 'react'
import './UserInfo.css'
// import {useHistory} from 'react-router-dom'

class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            room_key: ''
        }
    }

    componentDidMount = () => {
        console.log('this is the room key', this.props.location.state.room_key)
        this.setState({
            room_key: this.props.location.state.room_key
        })
    }
    // const history = useHistory();
    // const urlChange = () =>{ 
    //     let path = `game`; 
    //     history.push(path);
    // }
    render() {
        return(
            <div className="userInfo">
                <br />
                <h6 className="gameCode"> Game Code: {this.state.room_key} </h6>
                <form className="container">
                    <div className="box-userInfo-left">
                        <label className="prompt">Enter nickname</label><br/><br/>
                        <input className="nickname" type="text" placeholder="Nickname" spellCheck="false"></input><br/>
                    </div>
                    <div className="box-userInfo-right">
                        <label className="prompt">Choose a team</label><br/>
                        <input className="red" type="button"></input><br/>
                        <input className="blue" type="button"></input><br/>
                    </div>
                    <button className="startBtn">Start!</button>
                </form>
            </div>
        )
    }
}

export default UserInfo