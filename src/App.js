import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import ErrorBoundary from './ErrorBoundary.js'
import Map from './Map.js';
import MobileHeader from './MobileHeader.js';
import SelectProfile from './SelectProfile.js';
import NewTrip from './NewTrip.js';
import EditTrip from './EditTrip.js';
import { markersList } from './constants2.js';
import './App.css';

class App extends Component {
  state = {
    user: 'Eric',
    otherUsers: ['Russ','Scott','Michael'],
    allUsers: ['Eric', 'Russ', 'Scott', 'Michael'],
    showingInfoWindow: false,
    selectedPlace: {},
    seachTerm: '',
    selectedListItem: '',
    animateMarker: false,
    userSelected: false,
    tripData: {},
    newTripEntry: false,
    editTripEntry: false
  }
  
  //init the app
  componentWillMount = () => {
    this.initState();
  }

  initState = () => {
    const cachedTripData = localStorage.getItem('tripData');
    if (!cachedTripData) {
      this.setState({ tripData: markersList });
      localStorage.setItem('tripData', JSON.stringify(markersList));
    } else {
      this.setState({ tripData: JSON.parse(cachedTripData) })
    }
    const cachedUserSelected = localStorage.getItem('userSelected');
    if (cachedUserSelected) {
      this.setState({ userSelected: cachedUserSelected })
    }
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      this.setState({ user: cachedUser })
    }
    const cachedOtherUsers = localStorage.getItem('otherUsers');
    if (cachedOtherUsers) {
      this.setState({ otherUsers: JSON.parse(cachedOtherUsers) })
    }
    const cachedAllUsers = localStorage.getItem('allUsers');
    if (cachedOtherUsers) {
      this.setState({ allUsers: JSON.parse(cachedAllUsers) })
    }
  }

  //user selection
  changeUser = () => {
    this.setState({ userSelected: false })
  }

  selectUser = (user) => {
    this.setState({ user });
    localStorage.setItem('user', user)
    const otherUsers = this.state.allUsers.filter(item => item !== user)
    this.setState({ otherUsers });
    localStorage.setItem('otherUsers', JSON.stringify(otherUsers));
    this.setState({ userSelected: true });
    localStorage.setItem('userSelected', true)
  }

  closeModal = () => this.setState({ userSelected: true });

  addUser = (user) => {
    const tripData = JSON.parse(JSON.stringify(this.state.tripData));
    tripData[user] = [];
    console.log(this.state.allUsers)
    const allUsers = this.state.allUsers;
    allUsers.push(user)
    console.log(allUsers)
    this.setState({ tripData, allUsers });
    localStorage.setItem('tripData', JSON.stringify(tripData));
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    this.selectUser(user);
  }

  //new trip entry
  closeTripEntry = () => this.setState({ newTripEntry: false });

  addTrip = () => {
    this.setState({ newTripEntry: true })
  }

  addTripData = (location,lat,lng,notes) => {
    const newTripData = {
      label: location,
      lat: lat,
      lng: lng,
      notes: notes
    };
    const tripData = JSON.parse(JSON.stringify(this.state.tripData));
    tripData[this.state.user].push(newTripData);
    this.setState({ tripData })
    localStorage.setItem('tripData', JSON.stringify(tripData));
  }

  //editTrip
  closeEditTripEntry = () => this.setState({ 
    editTripEntry: false,
    showingInfoWindow: false,
    selectedListItem: ''
   });

  editTrip = () => {
    this.setState({ editTripEntry: true})
  }

  editTripData = (location,notes) => {
    const tripData = JSON.parse(JSON.stringify(this.state.tripData));
    let cityIndex = -1;
    tripData[this.state.user].forEach( (city,index) => {
      if (city.label === location) {
        cityIndex = index;
      }
    });
    tripData[this.state.user][cityIndex].notes = notes;
    this.setState({ tripData });
    localStorage.setItem('tripData', JSON.stringify(tripData));
  }

  deleteTripData = (location) => {;
    const tripData = JSON.parse(JSON.stringify(this.state.tripData));
    let cityIndex = -1;
    tripData[this.state.user].forEach( (city,index) => {
      if (city.label === location) {
        cityIndex = index;
      }
    });
    tripData[this.state.user].splice(cityIndex,1);
    this.setState({ tripData });
    localStorage.setItem('tripData', JSON.stringify(tripData));
  }

  //filter control
  updateSearch = (searchTerm) => {
    this.setState({ 
      showingInfoWindow: false,
      searchTerm: searchTerm 
    });
  }
  
  //city selection (map or list)
  onListClick = (city) => {
    this.setState({showingInfoWindow: false});
    const getMarker = this.state.tripData[this.state.user].filter( ({ label }) => label === city);
    const selectedPlace = {
      name: city,
      position: {
        lat: getMarker[0].lat,
        lng: getMarker[0].lng
      },
      notes: getMarker[0].notes
    };
    this.setState({selectedPlace: selectedPlace});
    //setTimeout is applied to showingInfoWindow so that the Window will 
    //appear after the marker stops bouncing
    setTimeout( () => this.setState({showingInfoWindow: true}), 850);
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
  
  //mobile menu
  closeMobileMenu = () => {
    const sidebarShow = document.getElementsByClassName('SidebarShow');
    if (sidebarShow[0]) {
      sidebarShow[0].className = 'Sidebar';
    }
  }

  render() {
    const { tripData, user, otherUsers, allUsers, userSelected, showingInfoWindow, selectedPlace, searchTerm, selectedListItem, animateMarker, newTripEntry, editTripEntry } = this.state;
    // modal component to allow user selection
    return (
      <div className="App">
        <SelectProfile
        userSelected={userSelected}
        closeModal={this.closeModal}
        allUsers={allUsers}
        selectUser={this.selectUser}
        addUser={this.addUser}
        />
        <NewTrip
          newTripEntry={newTripEntry}
          closeTripEntry={this.closeTripEntry}
          addTripData={this.addTripData}
        />
        <EditTrip
          editTripEntry={editTripEntry}
          closeEditTripEntry={this.closeEditTripEntry}
          editTripData={this.editTripData}
          deleteTripData={this.deleteTripData}
          selectedPlace={selectedPlace}
        />
        <MobileHeader 
          user={user}
        />
        <Sidebar
          user={user}
          otherUsers={otherUsers} 
          tripData={tripData}
          searchTerm={searchTerm}
          updateSearch={this.updateSearch}
          selectedListItem={selectedListItem}
          updateListSelection={this.updateListSelection}
          changeUser={this.changeUser}
          addTrip={this.addTrip}
          editTrip={this.editTrip}
        />
        <ErrorBoundary>
        <Map
          user={user} 
          allUsers={allUsers}
          tripData={tripData}
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
