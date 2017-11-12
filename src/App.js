import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Simple from './components/simple.js'
import TryCannon from './components/cannon.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TryCannon />
        <Simple />
      </div>
    );
  }
}

export default App;
