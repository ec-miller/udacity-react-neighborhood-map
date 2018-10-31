import React from 'react';
import logo from './logo.svg';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'

const Item = ({ city, updateListSelection, selectedListItem }) => (
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
      <CheckIcon 
        style={{color: selectedListItem === city ? 'green' : '#000000'} }
      />
    </ListItemIcon> 
  </ListItem>             
)

const Sidebar = ({ user, markersList, searchTerm, updateSearch, selectedListItem, updateListSelection }) => {
  const cities = markersList[user].map(marker => marker.label)
  const searchRegex = RegExp(searchTerm,'i')
    const searchCities = (() => {
      if (searchTerm) {
      return cities.filter( city => searchRegex.test(city) )
    } else {
      return cities;
    }
    })();

  return (
    <div className="Sidebar">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Eric's European Adventures</h1>
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
              updateListSelection={updateListSelection}
              selectedListItem={selectedListItem}
              key={city} 
            />
          )} 
        </List>
      </div>
      <div className='footer'></div>
    </div>
  );
}

export default Sidebar;