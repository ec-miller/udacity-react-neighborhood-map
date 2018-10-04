import React from 'react';
import logo from './logo.svg';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'

class Sidebar extends React.Component {
  state = {
    seachTerm: ''
  }

  updateSearch = (searchTerm) => {
    this.setState({ searchTerm: searchTerm })
  }

  render() {
    const { cities }=this.props
    const styles = theme => ({
      root: {
        width: '100%',
        backgroundColor: 'black'
      }
    })
    const searchTerm = this.state.searchTerm
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
            value={searchTerm} 
            onChange={ (event) => this.updateSearch(event.target.value)} 
          />  
        </form> 
        <div className={styles.root}>
          <List component="nav">
            {searchTerm && console.log(searchTerm)}
            {searchCities.map( city => {
              return <ListItem divider button key={city}>
                <ListItemText primary={city} />
                <ListItemIcon>
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