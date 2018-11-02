import React from 'react';
import logo from './logo.svg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

//need to add hover modal that indicates which buddies have been to a place you've been to
const Item = ({ city, travelBuddies, sharedLocales, updateListSelection, selectedListItem, changeUser }) => (
  <ListItem 
    divider
    button
    className='clickMe'
    id={city} 
    onClick={ (event) => { 
      updateListSelection(event.target.id)
    }}
    selected={ selectedListItem === city }
  >
    <ListItemText primary={city} />
    <ListItemIcon id={city}>
      <PersonIcon
        style={{ color: sharedLocales.some( (locale) => locale === city) ? 'green' : '#000000' }}
      />
    </ListItemIcon> 
    <ListItemIcon id={city}>
      <CheckIcon
        style={{ color: selectedListItem === city ? 'green' : '#000000' }}
      />
    </ListItemIcon> 
  </ListItem>             
)

const Sidebar = ({ user, otherUsers, markersList, searchTerm, updateSearch, selectedListItem, updateListSelection, changeUser }) => {
  const cities = markersList[user].map(marker => marker.label);
  const searchRegex = RegExp(searchTerm,'i');
  const searchCities = (() => {
    if (searchTerm) {
      return cities.filter( city => searchRegex.test(city) )
    } else {
      return cities;
    }
  })();
  const nameRegex = RegExp(/s$/)
  //find friends who have travelled to places that you have travelled
  //need to flip Travel buddies so key is City and value is array of buddies//
  let travelBuddies = {};
  let sharedLocales = [];
  otherUsers.forEach(otherUser => {
    travelBuddies[otherUser] = [];
    markersList[otherUser].forEach(marker => {
      cities.forEach(city => {
        if (city === marker.label) {
          travelBuddies[otherUser].push(city);
          sharedLocales.push(city);
        }
      });
    });
  });
  console.log(travelBuddies);
  console.log(sharedLocales);


  //Need to add icon that activates modal for switching users
  return (
    <div className="Sidebar">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">{user}'{!nameRegex.test(user) && 's'} European Adventures</h1>
      </header>
      <form role="search">
        <input type="search" aria-label="search text" name="search" placeholder="Filter Locations" 
          value={searchTerm || ''} 
          onChange={ (event) => updateSearch(event.target.value)} 
        />  
      </form> 
      <div className="sidebarList">
        <List component="nav">
          {searchCities.map( city => 
            <Item
              city={city}
              travelBuddies={travelBuddies}
              sharedLocales={sharedLocales}
              updateListSelection={updateListSelection}
              selectedListItem={selectedListItem}
              key={city} 
            />
          )} 
        </List>
      </div>
      <div className='footer'>
        <PeopleIcon
          style={{ color: 'green', float: 'left', marginTop: '.4em', marginLeft: '.5em' }}
          onClick={changeUser}
        ></PeopleIcon>
      </div>
    </div>
  );
}

export default Sidebar;