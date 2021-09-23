import React from 'react'
import './UserInfo.css'

function UserInfo(){
    return(
        <div className="userInfo">
            <br />
            <h6 className="gameCode"> Game Code: 00000 </h6>
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

export default UserInfo