import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react' //package for using Maps in React projects https://www.npmjs.com/package/google-maps-react

export class MapContainer extends React.Component {
  constructor() {
    super()
    this.key ='AIzaSyABpmKqdKmqcu7iEZ-JE0r5CgxqFljQsmY'
    this.data = {
      name: 'European Places of Interest',
      lat: 49.815273,
      lng: 6.129582999999999,
      markers: [
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
    }
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    console.log(props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map 
        className="map"
        style={style} 
        google={this.props.google} 
        zoom={14}
        initialCenter={{
          lat: this.data.lat,
          lng: this.data.lng
        }}
        zoom={5}
        onClick={this.onMapClicked}
      >
        {this.data.markers.map(marker => {
          return <Marker
          title={marker.label}
          name={marker.label}
          key={marker.label}
          position={{
            lat: marker.lat,
            lng: marker.lng
          }}
          onClick={this.onMarkerClick}
          />
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyABpmKqdKmqcu7iEZ-JE0r5CgxqFljQsmY'
})(MapContainer)
