import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import './App.css';

class App extends Component {
  state = {
    cities: ['Dubrovnik, Croatia', 'Dublin, Ireland', 'St. Ulrich, Italy', 'Kiruna, Sweden',
      'Amsterdam, The Netherlands', 'Berlin, Germany', 'Garmische-Partenkirchen, Germany',
      'Copenhagen, Denmark', 'Paris, France', 'Rome, Italy']
  }

  render() {
    const cities = this.state.cities
    return (
      <div className="App">
        <Sidebar 
          cities={cities}
        />
        <Map />
      </div>
    );
  }
}

export default App;
