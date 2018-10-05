import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import './App.css';

class App extends Component {
  state = {
    cities: ['Dubrovnik, Croatia', 'Dublin, Ireland', 'St. Ulrich, Italy', 'Kiruna, Sweden',
      'Amsterdam, The Netherlands', 'Berlin, Germany', 'Garmische-Partenkirchen, Germany',
      'Copenhagen, Denmark', 'Paris, France', 'Rome, Italy'],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    seachTerm: ''
  }

  updateSearch = (searchTerm) => {
    this.setState({ searchTerm: searchTerm })
  }

  onMarkerClick = (props, marker) => {
    // console.log(props, marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const cities = this.state.cities
    const showingInfoWindow = this.state.showingInfoWindow
    const activeMarker = this.state.activeMarker
    const selectedPlace = this.state.selectedPlace
    const searchTerm = this.state.searchTerm

    return (
      <div className="App">
        <Sidebar 
          cities={cities}
          searchTerm={searchTerm}
          updateSearch={this.updateSearch}
          onMarkerClick={this.onMarkerClick}
        />
        <Map 
          showingInfoWindow={showingInfoWindow}
          activeMarker={activeMarker}
          selectedPlace={selectedPlace}
          onMarkerClick={this.onMarkerClick}
          onMapClicked={this.onMapClicked}
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

export default App;
