import React from 'react'
import './Landing.css'
import Popup from './Popup'
import {useState} from 'react'



function Landing() {
    const [buttonPopup, setButtonPopup] = useState(false)
    return (
        <div className="Landing">
    
            <h1 class="Codenames-title">Codenames</h1>
            <body className="box">
            <button class="btn1">Create Room</button>
            <br></br>
            <button class="btn1">Enter code</button>
            <br></br>
            <button href="#" class="btn1" onClick={() => setButtonPopup(true)}> How to play</button>
            
            </body>
            <br></br>
            <Popup trigger = {buttonPopup} setTrigger ={setButtonPopup}>
                <h4>How to play</h4>
                <p className= "explanation">Codenames is a game of guessing which codenames (i.e., words) in a set are related to a hint-word given by another player. 
                Players split into two teams: red and blue. One player of each team is selected as the team's spymaster; the others are field operatives. ... </p>
            </Popup>
        </div>
    )
}

export default Landing