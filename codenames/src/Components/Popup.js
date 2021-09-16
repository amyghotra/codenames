import React from 'react'
import './Popup.css'

function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner"> </div>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
            {props.children}
        </div>
    ) : "";
}

export default Popup