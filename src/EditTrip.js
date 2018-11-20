import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditTrip extends Component {
  state = {
    notes: '',
    changed: false
  }

  initState = () => {
    const notes = this.props.selectedPlace.notes;
    this.setState({
      notes
    });
  }

  updateNotes = (notes) => {
    this.setState({ notes, changed: true })
  }

  componentDidUpdate = (nextProps) => {
    if (nextProps.selectedPlace !== this.props.selectedPlace) {
      this.initState();
    }
  }

  render() {
    const { editTripEntry, closeEditTripEntry, editTripData, deleteTripData, selectedPlace } = this.props;

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
                value={ editTripEntry ? selectedPlace.name : '' }
              ></TextField>
            </div>
            <div className='input-field'>
              <TextField
                id="lat"
                label='Latitude'
                margin='normal'
                disabled
                value={ editTripEntry ? selectedPlace.position.lat : '' }
              ></TextField>
            </div>
            <div className='input-field'>
              <TextField
                id="lng"
                label='Longitude'
                margin='normal'                
                disabled
                value={ editTripEntry ? selectedPlace.position.lng : '' }
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
                  editTripData(selectedPlace.name, this.state.notes);
                  closeEditTripEntry();
                }}
              >Edit Trip</Button>
            </div>
            <div className='edit-trip'>
              <Button 
                variant='outlined' 
                color='secondary'
                onClick={ () => {
                  deleteTripData(selectedPlace.name);
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