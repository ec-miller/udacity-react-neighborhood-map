import React from 'react';
import logo from './logo.svg';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'

class Sidebar extends React.Component {
  render() {
    const { cities, onListClick, searchTerm, updateSearch }=this.props
    const searchRegex = RegExp(searchTerm,'i')
    let searchCities
    if (searchTerm) {
      searchCities = cities.filter( city => searchRegex.test(city) )
    } else {
      searchCities = cities;
    }

    return (
      <div className="Sidebar">
        <header className="App-header" style={{ height: '20%' }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eric's European Adventures</h1>
        </header>
        <form style={{ height: '10%' }}>
          <input type="text" name="search" placeholder="Search for Places" 
            value={searchTerm || ''} 
            onChange={ (event) => updateSearch(event.target.value)} 
          />  
        </form> 
        <div style={{ minHeight: '60%', maxHeight: '65%', overflow: 'auto' }}>
          <List component="nav">
            {searchCities.map( city => {
              return <ListItem divider button className='clickMe' 
                  key={city} id={city} 
                  onClick={ (event) => { onListClick(event.target.id) }}>
                <ListItemText primary={city} />
                <ListItemIcon id={city}>
                  <CheckIcon />
                </ListItemIcon> 
              </ListItem>
            })} 
          </List>
        </div>
      </div>
    );
  }
}

export default Sidebar;