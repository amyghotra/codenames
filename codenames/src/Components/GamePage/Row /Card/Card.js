import React, { Component } from "react";
import './Card.css'

class card extends Component{
    constructor(){
        super()
        this.state = {
            word='',
            toggle: false,
            team: '',
            assassin: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            word: this.props.location.state.word,
            team: this.props.location.state.team,
            
        })
    }

    setToggle = () => {
        this.setState(prevState => {
            return{
                toggle: !prevState.toggle
            }
        })
    }


    render(){
        return(
            <div>
                <label className="card-container">
                    <input type="checkbox" onClick={this.setToggle}> </input>
                    <h6>word</h6>
                </label>
            </div>
        )
    }
}

export default Card