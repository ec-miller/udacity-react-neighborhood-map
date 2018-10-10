import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import MobileHeader from './MobileHeader.js'
import './App.css';

class App extends Component {
  state = {
    showingInfoWindow: false,
    selectedPlace: {},
    seachTerm: '',
    selectedListItem: ''
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
    },
    {
      lat: 47.4979,
      lng: 19.0402,
      label: 'Budapest, Hungary'
    },
    {
      lat: 52.9719,
      lng: -9.4265,
      label: 'Cliffs of Moher, Ireland'
    },
    {
      lat: 47.6302,
      lng: 9.6544,
      label: 'Berchtesgaden, Germany'
    },
    {
      lat: 59.3293,
      lng: 18.0686,
      label: 'Stockholm, Sweden'
    },
    {
      lat: 50.0755,
      lng: 14.4378,
      label: 'Prague, Czech Republic'
    },
    {
      lat: 44.1488,
      lng: 9.6544,
      label: 'Monterosso al Mare, Italy'
    }
  ]

  updateSearch = (searchTerm) => {
    this.setState({ searchTerm: searchTerm })
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
        selectedListItem: ''
      })
    };
    this.closeMobileMenu();
  }

  updateListSelection = (selectedListItem) => {
    if (this.state.selectedListItem === selectedListItem) {
      this.setState({ selectedListItem: '' });
      this.onMapClicked();
    } else {
      this.setState({ selectedListItem });
      this.onListClick(selectedListItem);
      this.closeMobileMenu()
    }
  }

  closeMobileMenu = () => {
    const sidebarShow = document.getElementsByClassName('SidebarShow');
    if (sidebarShow[0]) {
      sidebarShow[0].className = 'Sidebar';
    }
  }

  render() {
    const cities = this.markersList.map(marker => marker.label)
    const showingInfoWindow = this.state.showingInfoWindow
    const selectedPlace = this.state.selectedPlace
    const searchTerm = this.state.searchTerm
    const selectedListItem = this.state.selectedListItem

    return (
      <div className="App">
        <MobileHeader />
        <Sidebar 
          cities={cities}
          searchTerm={searchTerm}
          updateSearch={this.updateSearch}
          selectedListItem={selectedListItem}
          updateListSelection={this.updateListSelection}
        />
        <Map 
          markersList={this.markersList}
          showingInfoWindow={showingInfoWindow}
          selectedPlace={selectedPlace}
          updateListSelection={this.updateListSelection}
          onMapClicked={this.onMapClicked}
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

export default App;
