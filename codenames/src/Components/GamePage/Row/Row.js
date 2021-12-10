import React, { Component } from "react";
import Card from "../Card/Card"
import "./Row.css"

class Row extends Component{
    constructor(props){
        super(props)
        this.state = {
            task: '',
            rowWords: '',
            redteamid: '',
            blueteamid: '',
            cardNumbers: '',
            gameid: '',
        }
    }
    
    componentDidMount = () => {
        this.setState(prevState => {
            return {
                task: this.props.task,
                rowWords: this.props.rowWords,
                cardNumbers: this.props.cardNumbers,
                gameid: this.props.gameid
            }
        })
      
       
    }
    componentDidUpdate = (event) => {
        if (event.rowWords !== this.props.rowWords) {
            this.setState(prevState => {
                return {
                    rowWords: this.props.rowWords
                }
            })
        }
    }
    
    render(){
        return(
            <div>
                <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col">
                        {/* <div className="card-deck"> */}
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[0]}
                            increaseTeamPoints = {this.props.increaseTeamPoints} 
                            gameid={this.props.gameid}
<<<<<<< HEAD
                            number={this.state.cardNumbers[0]}
                            thisPlayer = {this.props.thisPlayer}
                            currentAllowedPlayer = {this.props.currentAllowedPlayer}
                            spymasterClueCount = {this.props.spymasterClueCount}
                            spymasterClueWord = {this.props.spymasterClueWord}/>
                        </div></div>
=======
                            number={this.state.cardNumbers[0]}/>
                        {/* </div>*/}
                        </div> 
>>>>>>> 7a1893a6d387af7c9582f775430d8b08efee8b76
                    </div>

                        <div className="col">
                        {/* <div className="card-deck"> */}
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[1]}
                            increaseTeamPoints = {this.props.increaseTeamPoints}
                            gameid={this.props.gameid}
<<<<<<< HEAD
                            number={this.state.cardNumbers[1]}
                            thisPlayer = {this.props.thisPlayer}
                            currentAllowedPlayer = {this.props.currentAllowedPlayer}
                            spymasterClueCount = {this.props.spymasterClueCount}
                            spymasterClueWord = {this.props.spymasterClueWord}/>
                        </div></div>
=======
                            number={this.state.cardNumbers[1]}/>
                        {/* </div> */}
                        </div>
>>>>>>> 7a1893a6d387af7c9582f775430d8b08efee8b76
                    </div>

                    
                        <div className="col">
                        {/* <div className="card-deck"> */}
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[2]}
                            increaseTeamPoints = {this.props.increaseTeamPoints}
                            gameid={this.props.gameid}
<<<<<<< HEAD
                            number={this.state.cardNumbers[2]}
                            thisPlayer = {this.props.thisPlayer}
                            currentAllowedPlayer = {this.props.currentAllowedPlayer}
                            spymasterClueCount = {this.props.spymasterClueCount}
                            spymasterClueWord = {this.props.spymasterClueWord}/>
                        </div></div> 
=======
                            number={this.state.cardNumbers[2]}/>
                        {/* </div> */}
                        </div> 
>>>>>>> 7a1893a6d387af7c9582f775430d8b08efee8b76
                    </div>

                    
                        <div className="col">
                        {/* <div className="card-deck"> */}
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[3]}
                            increaseTeamPoints = {this.props.increaseTeamPoints}
                            gameid={this.props.gameid}
<<<<<<< HEAD
                            number={this.state.cardNumbers[3]}
                            thisPlayer = {this.props.thisPlayer}
                            currentAllowedPlayer = {this.props.currentAllowedPlayer}
                            spymasterClueCount = {this.props.spymasterClueCount}
                            spymasterClueWord = {this.props.spymasterClueWord}/>
                        </div></div>
=======
                            number={this.state.cardNumbers[3]}/>
                        {/* </div> */}
                        </div>
>>>>>>> 7a1893a6d387af7c9582f775430d8b08efee8b76
                    </div>

                    
                        <div className="col">
                        {/* <div className="card-deck"> */}
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[4]}
                            increaseTeamPoints = {this.props.increaseTeamPoints}
                            gameid={this.props.gameid}
<<<<<<< HEAD
                            number={this.state.cardNumbers[4]}
                            thisPlayer = {this.props.thisPlayer}
                            currentAllowedPlayer = {this.props.currentAllowedPlayer}
                            spymasterClueCount = {this.props.spymasterClueCount}
                            spymasterClueWord = {this.props.spymasterClueWord}/>
                        </div></div>
=======
                            number={this.state.cardNumbers[4]}/>
                        {/* </div> */}
                        </div>
>>>>>>> 7a1893a6d387af7c9582f775430d8b08efee8b76
                    </div>
                    </div>
                </div>
                </div>
                <br/>
            </div>
            
            
        )
    }
}




export default Row