import React, {Component} from 'react'
import './Game.css'

class Game extends Component {
    constructor() {
        super()
        this.state = {
            room_key: '',
            nickname: '',
            team: ''
        }
    }

    componentDidMount = () => {
        console.log( 'this is the info from userinfo page', this.props.location.state.room_key, " ", this.props.location.state.nickname, " ", this.props.location.state.team)
        this.setState({
            room_key: this.props.location.state.room_key,
            nickname: this.props.location.state.nickname,
            team: this.props.location.state.team
        })
    }

    render() {
        return(
            <div className="game">
                <h6 className="gameCode"> {this.state.room_key} </h6>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="gameScores">
                                        <div className="redTeam">
                                            <h6 className="teamTitle"> Red Team</h6>
                                            <h6 className="teamContent"> Spymasters:</h6>
                                            <li className="bulletContent">username</li>
                                            <li className="bulletContent">username</li>
                                            <h6 className="teamContent"> Operatives:</h6>
                                            <li className="bulletContent">username</li>
                                            <li className="bulletContent">username</li>
                                        </div>

                                        <div className="blueTeam">
                                            <h6 className="teamTitle" >Blue Team</h6>
                                            <h6 className="teamContent"> Spymasters:</h6>
                                            <li className="bulletContent">username</li>
                                            <li className="bulletContent">username</li>
                                            <h6 className="teamContent"> Operatives:</h6>
                                            <li className="bulletContent">username</li>
                                            <li className="bulletContent">username</li>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="clueBody">
                                                <h5 className="clue">Clue: 1 Card(s) CURRENCY</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">

                                            {/* Row One */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Soldier</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Barbeque</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Truck</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Parade</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">India</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Row Two */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Agent</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Dollar</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Band</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Corn</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Scarecrow</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row Three */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Dash</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Hawk</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Beam</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Disease</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Tablet</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row Four */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Pasta</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Tea</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Troll</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Radio</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Violet</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row Five */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Press</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Glacier</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Salt</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Bride</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-deck">
                                                        <div className="card-body">
                                                            <h5 className="card-text">Delta</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        <div className="d-flex justify-content-end">
                                            <button className="btn">Submit Guesses</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game