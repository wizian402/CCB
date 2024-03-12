import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

function ACAVSRHeaderNav() {
  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      <CNavItem>
        <CNavLink href="#">현장 실습 관리</CNavLink>
      </CNavItem>
    </CHeaderNav>
  );
}

export default ACAVSRHeaderNav;