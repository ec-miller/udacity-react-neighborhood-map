import React from 'react';
import CheckIcon from '@material-ui/icons/Check'

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
        <CheckIcon
          className='sidebarToggle' 
          onClick={this.toggleMenu}
        />
        <h2 className="MobileHeaderText">Eric's European Adventures</h2>
      </div>

    );
  }
}

export default MobileHeader;