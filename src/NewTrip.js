import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NewTrip extends Component {
  state = {
    location: '',
    lat: '',
    lng: '',
    notes: '',
    goodGeoCode: true,
    geoCodeApiUp: true
  }

  updateLocation = (location) => {
    this.setState({ 
      location,
      lat: '',
      lng: '',
      notes: '',
      goodGeoCode: true,
      geoCodeApiUp: true 
    })
  }

  updateNotes = (notes) => {
    this.setState({ notes })
  }

  getGeocode = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.location}&key=AIzaSyABpmKqdKmqcu7iEZ-JE0r5CgxqFljQsmY`)
      .then(results => results.json())
      .then(geoCodes => {
        if (geoCodes.status === 'OK' && geoCodes.results[0].types.some((type) => type === 'locality')) {
          this.setState({
            location: geoCodes.results[0].formatted_address,
            lat: geoCodes.results[0].geometry.location.lat,
            lng: geoCodes.results[0].geometry.location.lng
          })
        } else {
          this.setState({ goodGeoCode: false })
        }
        console.log(geoCodes.results[0].types);
      })
      .catch(error => {
        console.log('Error: Unable to pull GeoCode via Google Maps API',error);
        this.setState({ geoCodeApiUp: false });
      })
  }

  render() {
    const { newTripEntry, closeTripEntry, addTripData } = this.props;

    return (
      <Modal
        open={newTripEntry}
        onBackdropClick={closeTripEntry}
      >
        <div className='modal'>
          <form className='trip-form'>
            <div className='input-field'>
              <TextField
                id="location"
                label='Location'
                placeholder='City, Country'
                margin='normal'
                fullWidth
                value={this.state.location}
                onChange={ (event) => this.updateLocation(event.target.value)}
                error={ this.state.goodGeoCode ? this.state.geoCodeApiUp ? false : true : true }
                helperText={this.state.goodGeoCode ? this.state.geoCodeApiUp ? '' : 'GoogleMaps API is down, please try again later' : 'Please try another location' } 
              ></TextField>
            </div>
            <div className='get-geocode'>
              <Button 
                variant='outlined' 
                color='secondary'
                onClick={ () => this.getGeocode()}
                >Get Geocode</Button>
            </div>
            <div className='input-field'>
              <TextField
                id="lat"
                label='Latitude'
                margin='normal'
                disabled
                value={this.state.lat}
              ></TextField>
            </div>
            <div className='input-field'>
              <TextField
                id="lng"
                label='Longitude'
                margin='normal'                
                disabled
                value={this.state.lng}
              ></TextField>
            </div>
            <div className='input-field-long'>
              <TextField
                id="notes"
                label='Notes'
                multiline
                rowsMax='8'
                fullWidth
                placeholder='Deary Diary...'
                margin='normal'
                value={this.state.notes}
                onChange={ (event) => this.updateNotes(event.target.value) }
              ></TextField>
            </div>
            <div className='add-new-trip'>
              <Button 
                variant='outlined' 
                color='primary'
                onClick={ () => {
                  console.log(this.state.location,this.state.lat,this.state.lng,this.state.notes);
                  addTripData(this.state.location,this.state.lat,this.state.lng,this.state.notes);
                  this.updateLocation('');
                  closeTripEntry();
                  }}
              >Add New Trip</Button>
            </div>

          </form>
        </div>
      </Modal>
    );
  }
}

export default NewTrip;