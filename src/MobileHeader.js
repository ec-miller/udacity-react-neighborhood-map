import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'

class MobileHeader extends React.Component {
  toggleMenu = () => {
    const sidebar = document.getElementsByClassName('Sidebar');
    if (sidebar[0]) {
      sidebar[0].className = 'SidebarShow';
    } else {
      const sidebarShow = document.getElementsByClassName('SidebarShow');
      sidebarShow[0].className = 'Sidebar';
    }
  }

  render() {
    return (
      <div className="MobileHeader">
        <MenuIcon
          className='sidebarToggle' 
          onClick={this.toggleMenu}
        />
        <h2 className="MobileHeaderText">Eric's European Adventures</h2>
      </div>

    );
  }
}

export default MobileHeader;