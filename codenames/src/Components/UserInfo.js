import React from 'react'
import './UserInfo.css'

function UserInfo(){
    return(
        <div className="userInfo">
            <h6 className="gameCode"> Game Code: 00000 </h6>
            <form className="box-userInfo">
                <label className="prompt">Enter Nickname</label><br/>
                <input className="Nickname" type="text" placeholder="Nickname" spellCheck="false"></input>
            </form>
            <br/>
            <form className="box-userInfo">
                <label className="prompt">Choose a team</label><br/>
                
            </form>
    
        </div>
    )
}

export default UserInfo