import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

function CounselorHeaderNav() {
  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      <CNavItem>
        <CNavLink href="#">상담</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">상담</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">상담</CNavLink>
      </CNavItem>
    </CHeaderNav>
  );
}

export default CounselorHeaderNav;