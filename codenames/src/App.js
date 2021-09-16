import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Landing from './Components/Landing.js';


class App extends Component {
  constructor() {
    super()

    this.state = {

    }

    
  }

  componentDidMount() {
    this.getRequest();
  }

  async getRequest() {
    let response = await axios.get('http://127.0.0.1:8000/room/');
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        
        <Landing />
      </div>
    );
  }
}

export default App