import React from 'react'
import './Game.css'

function Game(){
    return(
        <div className="game">
            <h6 className="gameCode"> Game Code: 00000 </h6>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-4">
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
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div className="clueBody">
                                            <h5 className="clue">Clue: 1 Card(s) CURRENCY</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">

                                        {/* Row One */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Soldier</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Barbeque</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Truck</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Parade</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">India</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row Two */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Agent</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Dollar</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Band</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Corn</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Scarecrow</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row Three */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Dash</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Hawk</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Beam</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Disease</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Tablet</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row Four */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Pasta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Tea</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Troll</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Radio</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Violet</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row Five */}
                                        <div class="row">
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Press</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Glacier</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Salt</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Bride</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card-deck">
                                                    <div class="card-body">
                                                        <h5 class="card-text">Delta</h5>
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                    <div class="d-flex justify-content-end">
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

export default Game