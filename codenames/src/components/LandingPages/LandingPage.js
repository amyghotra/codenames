import React from 'react';
import { Redirect } from 'react-router-dom';
import './LandingPage.css';
import {Link} from 'react-router-dom'

class LandingPage extends React.Component {
    render(){
        return (
            <div className="Landing">
            <header class="masthead d-flex align-items-center">
                <div class="container px-4 px-lg-5 text-center">
                    <h1 class="mb-1">Codenames</h1>

                    <h3 class="mb-5"><em>A Fun Game to Play</em></h3>

                    <div class = "border-box">
                    <a class="btn btn-primary btn-xl" href="/createroom">Create A Room</a>
                    <br></br>
                    <a class="btn btn-primary btn-xl" href="/entercode">Enter Code</a>
                    <br></br>
                    <a class="btn btn-primary btn-xl" href="/howto">How To Play</a>
                    </div>
                </div>
            </header>
        </div>
        );
    }
}

export default LandingPage;