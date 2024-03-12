import React from 'react';
import { CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

function StudentHeaderNav() {
  return (
    <CHeaderNav className="d-none d-md-flex me-auto">
      <CNavItem>
        <CNavLink href="#">현장 실습</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">취업 활동</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="#">상담 신청</CNavLink>
      </CNavItem>
    </CHeaderNav>
  );
}

export default StudentHeaderNav;