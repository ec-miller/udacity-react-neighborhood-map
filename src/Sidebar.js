import React from 'react';
import logo from './logo.svg';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'

class Sidebar extends React.Component {
  render() {
    const { cities }=this.props
    const styles = theme => ({
      root: {
        width: '100%',
        backgroundColor: 'black'
      }
    })

    return (
      <div className="Sidebar">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eric's European Adventures</h1>
        </header>
        <form>
          <input type="text" name="search" placeholder="Search for Places"></input>  
        </form> 
        <div className={styles.root}>
          <List component="nav">
            {cities.map( city => {
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