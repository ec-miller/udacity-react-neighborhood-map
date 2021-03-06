import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react' //package for using Maps in React projects https://www.npmjs.com/package/google-maps-react
import { styles } from './constants.js'
import CodeIcon from '@material-ui/icons/Code'

export class MapContainer extends React.Component {
  data = {
    name: 'European Places of Interest',
    lat: 51.515273,
    lng: 6.129582999999999,
  }
  state = {
    photoDetails: [],
    flickrAPI: false
  }  

  style = {
      width: '100%',
      height: '100%'
    }

  compileCities() {
    const allCities = [];
    this.props.allUsers.forEach((user) => {
      this.props.tripData[user].forEach((marker) => {
        allCities.push(marker.label)
      });
    });
    return allCities;
  }
  //need to call getPhotoDetails after adding a new trip - also need to cache these results per city
  getPhotoDetails = (cities) => {
    cities.forEach( (city) => {
      const cachedFlickrData = localStorage.getItem(city);
      if (!cachedFlickrData) {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0c0162b8a07a500a529e6ed1faf1b191&tags=${city}&sort=interestingness-desc&privacy_filter=1&media=photos&has_geo=&per_page=20&format=json&nojsoncallback=1`)
          .then(results => {
            return results.json();
          })
          .then(photoDetails => {
            if (photoDetails.stat === 'ok') {
              this.setState(state => ({
                photoDetails: [
                  ...state.photoDetails,
                  { name: city, photos: photoDetails.photos.photo }
                ]
              }), () => this.setState({ flickrAPI: true }));
              localStorage.setItem(city, JSON.stringify({ name: city, photos: photoDetails.photos.photo }));
            } else {
              console.log('Error: Unable to pull photos via Flickr API', photoDetails.code, photoDetails.message);
              this.setState({ flickrAPI: false });
            }
          })
          .catch(error => {
            console.log('Error: Unable to pull photos via Flickr API', error);
            this.setState({ flickrAPI: false });
          })
      } else {
        const parsedFlickrCache = JSON.parse(cachedFlickrData)
        this.setState(state => ({
          photoDetails: [
            ...state.photoDetails,
            { ...parsedFlickrCache }
          ]
        }), () => this.setState({ flickrAPI: true }));
      }
      
    })
  }

  gm_authFailure() {
    window.alert("Error: Google Maps Javascript API Key missing")
  }

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
    const cities = this.compileCities();
    this.getPhotoDetails(cities);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.tripData !== this.props.tripData) {
      const cities = this.compileCities();
      this.getPhotoDetails(cities);
    }
  }

  render() {
    const { showingInfoWindow, user, tripData, selectedPlace, onMapClicked, searchTerm, updateListSelection, animateMarker } = this.props
    const selectedPhoto = this.state.photoDetails.filter(photo => photo.name === selectedPlace.name)
    const randomPhoto = Math.floor(Math.random() * Math.floor(20))
    const searchRegex = RegExp(searchTerm, 'i')
    const myTripData = tripData[user]
    let markers
    if (searchTerm) {
      markers = myTripData.filter(marker => searchRegex.test(marker.label))
    } else {
      markers = myTripData;
    }

    return (
      <Map 
        className="map"
        style={this.style} 
        styles={styles}
        google={this.props.google} 
        zoom={5}
        initialCenter={{
          lat: this.data.lat,
          lng: this.data.lng
        }}
        onClick={onMapClicked}
      >
        {markers.map( marker => {
          return <Marker
          className={marker.label}
          title={marker.label}
          name={marker.label}
          key={marker.label}
          position={{
            lat: marker.lat,
            lng: marker.lng
          }}
          animation={ animateMarker && marker.label === selectedPlace.name && window.google.maps.Animation.BOUNCE }
          onClick={ (event) => {
            updateListSelection(event.name);
          }}
          />
        })}
        <InfoWindow
          position={selectedPlace.position}
          pixelOffset={ new window.google.maps.Size(0,-40) }
          visible={showingInfoWindow}
        >
          <div className="infoWindow">
            <h1>{selectedPlace.name}</h1>
            { this.state.flickrAPI && selectedPhoto[0] &&
              <div> 
                <img
                src={`https://farm${selectedPhoto[0].photos[randomPhoto].farm}.staticflickr.com/${selectedPhoto[0].photos[randomPhoto].server}/${selectedPhoto[0].photos[randomPhoto].id}_${selectedPhoto[0].photos[randomPhoto].secret}.jpg`}
                title={selectedPhoto[0].photos[0].title}
                alt={selectedPhoto[0].name}
                ></img>
                <figcaption>Image sourced via Flickr API</figcaption>
              </div>
            }
            { !this.state.flickrAPI && 
              <div>
              <h3>Sorry, but the Flickr API is currently unavailable. Please check back soon.</h3>
              <CodeIcon />
              </div>
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
