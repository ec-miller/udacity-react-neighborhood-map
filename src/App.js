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
    selectedPlace: {},
    seachTerm: ''
  }

  markersList = [
    {
      lat: 42.65066059999999,
      lng: 18.0944238,
      label: 'Dubrovnik, Croatia'
    },
    {
      lat: 53.348155,
      lng: -6.256794999999999,
      label: 'Dublin, Ireland'
    },
    {
      lat: 46.5734348,
      lng: 11.6742025,
      label: 'St. Ulrich, Italy'
    },
    {
      lat: 67.8557995,
      lng: 20.225282,
      label: 'Kiruna, Sweden'
    },
    {
      lat: 52.3679843,
      lng: 4.9035614,
      label: 'Amsterdam, The Netherlands'
    },
    {
      lat: 52.52000659999999,
      lng: 13.404954,
      label: 'Berlin, Germany'
    },
    {
      lat: 47.4916945,
      lng: 11.0954984,
      label: 'Garmische-Partenkirchen, Germany'
    },
    {
      lat: 55.6760968,
      lng: 12.5683372,
      label: 'Copenhagen, Denmark'
    },
    {
      lat: 48.856614,
      lng: 2.3522219,
      label: 'Paris, France'
    },
    {
      lat: 41.9027835,
      lng: 12.4963655,
      label: 'Rome, Italy'
    }
  ]

  updateSearch = (searchTerm) => {
    this.setState({ searchTerm: searchTerm })
  }

  onMarkerClick = (props) => {
    this.setState({
      selectedPlace: props,
      showingInfoWindow: true
    });
  }

  onListClick = (city) => {
    const getMarker = this.markersList.filter( (marker) => marker.label === city)
    const selectedPlace = {
      name: city,
      position: {
        lat: getMarker[0].lat,
        lng: getMarker[0].lng
      }
    }
    this.setState({
      selectedPlace: selectedPlace,
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
    const selectedPlace = this.state.selectedPlace
    const searchTerm = this.state.searchTerm

    return (
      <div className="App">
        <Sidebar 
          cities={cities}
          searchTerm={searchTerm}
          updateSearch={this.updateSearch}
          onListClick={this.onListClick}
        />
        <Map 
          markersList={this.markersList}
          showingInfoWindow={showingInfoWindow}
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
