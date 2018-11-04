import React from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const NewTrip = ({newTripEntry, closeTripEntry}) => {

  return (
    <Modal
      open={newTripEntry}
      onBackdropClick={closeTripEntry}
    >
      <div className = 'modal'>
        <form className = 'trip-form'>
          <div className='input-field'>
            <TextField
              id="location"
              label='Location'
              placeholder='City, Country'
              margin='normal'
            ></TextField>
          </div>
          <div className='get-geocode'>
            <Button variant='outlined' color='secondary'>Get Geocode</Button>
          </div>
          <div className='input-field'>
            <TextField
              id="lat"
              label='Latitude'
              margin='normal'
            ></TextField>
          </div>
          <div className='input-field'>
            <TextField
              id="lng"
              label='Longitude'
              margin='normal'
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
            ></TextField>
          </div>
          <div className='add-new-trip'>
            <Button variant='outlined' color='primary'>Add New Trip</Button>
          </div>
          
        </form>
      </div>
    </Modal>
  )
}

export default NewTrip