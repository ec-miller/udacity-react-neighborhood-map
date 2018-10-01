import React from 'react';
import logo from './logo.svg';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="Sidebar">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eric's European Adventures</h1>
        </header>
        <form>
          <input type="text" name="search" placeholder="Search for Places"></input>  
        </form> 
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Sidebar;