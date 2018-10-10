import React from 'react';
import logo from './logo.svg';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'

class Sidebar extends React.Component {
  render() {
    const { cities, searchTerm, updateSearch, selectedListItem, updateListSelection } = this.props
    const searchRegex = RegExp(searchTerm,'i')
    let searchCities
    if (searchTerm) {
      searchCities = cities.filter( city => searchRegex.test(city) )
    } else {
      searchCities = cities;
    }

    return (
      <div className="Sidebar">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eric's European Adventures</h1>
        </header>
        <form>
          <input type="text" name="search" placeholder="Search for Places" 
            value={searchTerm || ''} 
            onChange={ (event) => updateSearch(event.target.value)} 
          />  
        </form> 
        <div className="sidebarList">
          <List component="nav">
            {searchCities.map( city => {
              return <ListItem divider button className='clickMe' 
                  key={city} id={city} 
                  onClick={ (event) => { 
                    updateListSelection(event.target.id)
                  }}
                  selected={ selectedListItem === city }
                  >
                <ListItemText primary={city} />
                <ListItemIcon id={city}>
                  <CheckIcon />
                </ListItemIcon> 
              </ListItem>
            })} 
          </List>
        </div>
        <div className='footer'></div>
      </div>
    );
  }
}

export default Sidebar;