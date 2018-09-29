import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
