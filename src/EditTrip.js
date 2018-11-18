import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditTrip extends Component {
  state = {
    location: '',
    lat: '',
    lng: '',
    notes: '',
    goodGeoCode: true,
    geoCodeApiUp: true,
    changed: false
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
    this.setState({ notes, changed: true })
  }

  render() {
    const { editTripEntry, closeEditTripEntry, editTripData } = this.props;

    return (
      <Modal
        open={editTripEntry}
        onBackdropClick={closeEditTripEntry}
      >
        <div className='modal'>
          <form className='trip-form'>
            <div className='input-field-long'>
              <TextField
                id="location"
                label='Location'
                placeholder='City, Country'
                margin='normal'
                fullWidth
                disabled
                value={this.state.location}
              ></TextField>
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
            <div className='edit-trip'>
              <Button 
                variant='outlined' 
                color='primary'
                disabled={ this.state.changed ? false : true}
                onClick={ () => {
                    editTripData(this.state.location, this.state.lat, this.state.lng, this.state.notes);
                    this.updateLocation('');
                    closeEditTripEntry();
                  }}
              >Edit Trip</Button>
            </div>
            <div className='edit-trip'>
              <Button 
                variant='outlined' 
                color='secondary'
                onClick={ () => {
                    editTripData(this.state.location, this.state.lat, this.state.lng, this.state.notes);
                    this.updateLocation('');
                    closeEditTripEntry();
                  }}
              >Delete Trip</Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default EditTrip;