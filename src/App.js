import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import ErrorBoundary from './ErrorBoundary.js'
import Map from './Map.js';
import MobileHeader from './MobileHeader.js';
import { markersList } from './constants2.js';
import './App.css';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    user: 'Eric',
    otherUsers: ['Russ','Scott','Michael'],
    showingInfoWindow: false,
    selectedPlace: {},
    seachTerm: '',
    selectedListItem: '',
    animateMarker: false,
    userSelected: false
  }

  allUsers = ['Eric', 'Russ', 'Scott', 'Michael']

  updateSearch = (searchTerm) => {
    this.setState({ 
      showingInfoWindow: false,
      searchTerm: searchTerm 
    });
  }

  onListClick = (city) => {
    this.setState({showingInfoWindow: false});
    const getMarker = markersList[this.state.user].filter( ({ label }) => label === city);
    const selectedPlace = {
      name: city,
      position: {
        lat: getMarker[0].lat,
        lng: getMarker[0].lng
      }
    };
    this.setState({selectedPlace: selectedPlace});
    //setTimeout is applied to showingInfoWindow so that the Window will 
    //appear after the marker stops bouncing
    setTimeout( () => this.setState({showingInfoWindow: true}), 850);
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

  triggerAnimation = () => {
    this.setState({ animateMarker: true });
    setTimeout( () => this.setState({ animateMarker: false}), 750);
  } 

  updateListSelection = (selectedListItem) => {
    if (this.state.selectedListItem === selectedListItem) {
      this.setState({ selectedListItem: '' });
      this.onMapClicked();
    } else {
      this.setState({ selectedListItem });
      this.onListClick(selectedListItem);
      this.closeMobileMenu();
      this.triggerAnimation();
    }
  }

  closeMobileMenu = () => {
    const sidebarShow = document.getElementsByClassName('SidebarShow');
    if (sidebarShow[0]) {
      sidebarShow[0].className = 'Sidebar';
    }
  }

  //user selection modal
  selectUser = (user) => {
    console.log(user);
    this.setState({ user });
    const otherUsers = this.allUsers.filter( item => item !== user)
    this.setState({ otherUsers });
    this.setState({ userSelected: true });
  }

  render() {
    const { user, otherUsers, userSelected, showingInfoWindow, selectedPlace, searchTerm, selectedListItem, animateMarker } = this.state
    
    // modal component to allow user selection
    return (
      <div className="App">
        <Modal
        open={!userSelected}
        >
          <div className='modal'>
            <div className='button-container'>
            <h3 className='button-title'>Select your user:</h3>
            {this.allUsers.map(user => {
              return <Button 
              key={user}
              className='button'
              onClick={ () => {
                this.selectUser(user)
              }}
              >{user}</Button>
            })}
            </div>
          </div>
        </Modal>
        <MobileHeader />
        <Sidebar
          user={user}
          otherUsers={otherUsers} 
          markersList={markersList}
          searchTerm={searchTerm}
          updateSearch={this.updateSearch}
          selectedListItem={selectedListItem}
          updateListSelection={this.updateListSelection}
        />
        <ErrorBoundary>
        <Map
          user={user} 
          markersList={markersList}
          showingInfoWindow={showingInfoWindow}
          selectedPlace={selectedPlace}
          updateListSelection={this.updateListSelection}
          onMapClicked={this.onMapClicked}
          searchTerm={searchTerm}
          animateMarker={animateMarker}
        />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
