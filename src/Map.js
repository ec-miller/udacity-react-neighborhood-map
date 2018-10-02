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
      selectedPlace: {},
      photoDetails: []
    }
  }

  getPhotoDetails = () => {
    this.data.markers.map( (marker) => {
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=210faf4ab82b8d0fdd0e13dc09080003&tags=${marker.label}&sort=interestingness-desc&privacy_filter=1&media=photos&has_geo=&per_page=10&format=json&nojsoncallback=1`)
        .then( results => {
          return results.json();
        })
        .catch(error => {
          console.log(error)
        }) 
        .then( photoDetails => {
          this.setState( state => ({
              photoDetails: [
                ...state.photoDetails,
                {name: marker.label, photos: photoDetails.photos.photo} 
              ]
          }))
          // console.log(this.state.photoDetails)
        })
    })
  }

  onMarkerClick = (props, marker, e) => {
    // console.log(props, marker, e);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    // console.log(props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  componentDidMount() {
    this.getPhotoDetails();
  }

  render() {
    const selectedPhoto = this.state.photoDetails.filter(photo => photo.name === this.state.selectedPlace.name)
    const style = {
      width: '100%',
      height: '100%'
    }
    // MotorYoga style from snazzymaps https://snazzymaps.com/style/135866/motoryoga
    const styles = [
      {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "-100"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "simplified"
          },
          {
            "color": "#ff8000"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
          {
            "hue": "#ff8000"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 65
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": "50"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "-100"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
          {
            "lightness": "30"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
          {
            "lightness": "40"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#fafafa"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": -25
          },
          {
            "saturation": -97
          },
          {
            "color": "#c9dbcb"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          {
            "lightness": -25
          },
          {
            "saturation": -100
          }
        ]
      }
    ]

    return (
      <Map 
        className="map"
        style={style} 
        styles={styles}
        google={this.props.google} 
        zoom={5}
        initialCenter={{
          lat: this.data.lat,
          lng: this.data.lng
        }}
        onClick={this.onMapClicked}
      >
        {this.data.markers.map( marker => {
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
        { console.log(selectedPhoto) }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            { (selectedPhoto[0]) && 
              <img
              src={`https://farm${selectedPhoto[0].photos[0].farm}.staticflickr.com/${selectedPhoto[0].photos[0].server}/${selectedPhoto[0].photos[0].id}_${selectedPhoto[0].photos[0].secret}.jpg`}
              title={'photo of' + selectedPhoto[0].name}
              alt={'photo of' + selectedPhoto[0].name}
              ></img>
            }
          </div>
        </InfoWindow>  
      </Map>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyABpmKqdKmqcu7iEZ-JE0r5CgxqFljQsmY'
})(MapContainer)
