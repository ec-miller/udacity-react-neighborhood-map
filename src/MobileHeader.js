import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'

const MobileHeader = ({user}) => {
  const toggleMenu = () => {
    const sidebar = document.getElementsByClassName('Sidebar');
    if (sidebar[0]) {
      sidebar[0].className = 'SidebarShow';
    } else {
      const sidebarShow = document.getElementsByClassName('SidebarShow');
      sidebarShow[0].className = 'Sidebar';
    }
  }
  const nameRegex = RegExp(/s$/)

  return (
    <div className="MobileHeader">
      <MenuIcon
        className='sidebarToggle' 
        onClick={ () => toggleMenu() }
      />
      <h2 className="MobileHeaderText">{user}'{!nameRegex.test(user) && 's'} European Adventures</h2>
    </div>
  );

}

export default MobileHeader;