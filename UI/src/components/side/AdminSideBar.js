import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

function AdminHeaderNav() {
  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      <CNavItem>
        <CNavLink href="#">운영자</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">운영자</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">운영자</CNavLink>
      </CNavItem>
    </CHeaderNav>
  );
}

export default AdminHeaderNav;