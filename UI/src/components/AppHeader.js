import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import StudentHeaderNav from './head/StudentHeader'
import AdminHeaderNav from './head/AdminHeader'
import ACAVSRHeaderNav from './head/ACAVSRHeader'
import SCSBJTHeaderNav from './head/SCSBJTHeader'
import BzentyHeaderNav from './head/BzentyHeader'
import CounselorHeaderNav from './head/CounselorHeader'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()

    fetch('/cbb/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    navigate('/login')
  };

  const userGroup = localStorage.getItem('userGroupCd');

  let HeaderNavComponent;
  if (userGroup === '10') {
    HeaderNavComponent = <AdminHeaderNav />;
  } else if (userGroup === '20') {
    HeaderNavComponent = <StudentHeaderNav />;
  } else if (userGroup === '30') {
    HeaderNavComponent = <ACAVSRHeaderNav />;
  } else if (userGroup === '40') {
    HeaderNavComponent = <SCSBJTHeaderNav />;
  } else if (userGroup === '50') {
    HeaderNavComponent = <BzentyHeaderNav />;
  } else if (userGroup === '60') {
    HeaderNavComponent = <CounselorHeaderNav />;
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        {HeaderNavComponent}
        <CHeaderNav>
          <CNavItem>
            <CNavLink onClick={handleLogout}>
              Logout
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
