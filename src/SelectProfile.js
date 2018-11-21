import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

class SelectProfile extends Component {
  state = {
    name: '',
    nameEntry: false,
    validEntry: false
  }

  openNameEntry = () => {
    this.setState({ nameEntry: true })
  }

  closeNameEntry = () => {
    this.setState({ nameEntry: false })
  }

  updateName = (name) => {
    this.setState({ name })
  }

  render() {
    const { userSelected, closeModal, allUsers, addUser, selectUser } = this.props

    return (
      <div>
        <Modal
          open={!userSelected}
          onBackdropClick={closeModal}
        >
          <div className='modal'>
            <div className='button-container'>
              <h3 className='button-title'>Select Your Profile</h3>
              {allUsers.map(user => {
                return <Button
                  key={user}
                  className='button'
                  onClick={() => selectUser(user)}
                >{user}</Button>
              })}
            </div>
            <AddCircleOutline
              style={{ color: 'green', float: 'right', marginTop: '.4em', marginRight: '.5em', marginBottom: '1em' }}
              onClick={() => this.openNameEntry()}
            ></AddCircleOutline>
          </div>
        </Modal>
        <Dialog
          open={this.state.nameEntry}
          onClose={this.closeNameEntry}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Your First Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              value={this.state.name}
              onChange={ (event) => this.updateName(event.target.value)}
              fullWidth
              error={allUsers.some(user => user === this.state.name) ? true : false}
              helperText={allUsers.some(user => user === this.state.name) ? `Sorry, the name ${this.state.name} is already in use` : ''}
            />
          </DialogContent>
          <DialogActions>
            <div className='add-new-trip'>
              <Button
                onClick={() => {
                  addUser(this.state.name);
                  this.closeNameEntry();
                  this.updateName('');
                }}
                color="primary"
                disabled={allUsers.some(user => user === this.state.name) || this.state.name === '' ? true : false}
              >Add Profile
            </Button>
            </div>
            
          </DialogActions>
        </Dialog>
      </div>

      
    );
  } 
  
}

export default SelectProfile;