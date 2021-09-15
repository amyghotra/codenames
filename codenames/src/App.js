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
    axios.get('http://127.0.0.1:8000/room').then(res => {
      console.log(res);
    }); 
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