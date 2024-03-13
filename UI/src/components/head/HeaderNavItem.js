import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import { NavLink } from 'react-router-dom'
function MenuItem({ name, link }) {
  return (
    <CNavItem>
      <CNavLink to={link} component={NavLink}>{name}</CNavLink>
    </CNavItem>
  );
}

function HeaderNavItem({ navItem }) {
  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      {navItem.map((navItem, index) => (
        <MenuItem key={index} name={navItem.name} link={navItem.link} />
      ))}
    </CHeaderNav>
  );
}

export default HeaderNavItem;