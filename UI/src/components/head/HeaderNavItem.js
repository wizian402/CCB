import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import { NavLink } from 'react-router-dom'
function MenuItem({ setSelectedMenu, name, link }) {
  return (
    <CNavItem>
      <CNavLink to={link} component={NavLink} onClick={() => setSelectedMenu(link)}>
        {name}
      </CNavLink>
    </CNavItem>
  );
}

function HeaderNavItem({ navItem, setSelectedMenu }) {

  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      {navItem.map((navItem, index) => (
        <MenuItem setSelectedMenu={setSelectedMenu} key={index} name={navItem.name} link={navItem.link} />
      ))}
    </CHeaderNav>
  );
}

export default HeaderNavItem;