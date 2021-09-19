import React from 'react'
import './UserInfo.css'

function UserInfo(){
    return(
        <div className="userInfo">
            <h6 className="gameCode"> Game Code: 00000 </h6>
            <form className="box-userInfo">
                <label className="prompt">Enter nickname</label><br/>
                <input className="nickname" type="text" placeholder="Nickname" spellCheck="false"></input><br/>
                <label className="prompt">Choose a team</label><br/>
                <input className="red" type="button"></input><br/>
                <input className="blue" type="button"></input><br/>
            </form>
        </div>
    )
}

export default UserInfo