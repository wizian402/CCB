import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

function SCSBJTHeaderNav() {
  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      <CNavItem>
        <CNavLink href="#">지도교수 배정</CNavLink>
      </CNavItem>
    </CHeaderNav>
  );
}

export default SCSBJTHeaderNav;