import React from 'react';
import CheckIcon from '@material-ui/icons/Check'

class MobileHeader extends React.Component {
  toggleMenu = () => {
    const sidebar = document.getElementsByClassName('Sidebar')
    if (sidebar[0].className === 'Sidebar') {
      sidebar[0].className = 'SidebarShow'
    }
  }

  render() {
    return (
      <div className="MobileHeader">
        <CheckIcon
          className='sidebarToggle' 
          onClick={this.toggleMenu}
        />
        <h2 className="MobileHeaderText">Hello App!</h2>
      </div>

    );
  }
}

export default MobileHeader;