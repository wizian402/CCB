import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { _nav as acavsrNav } from 'src/nav/ACAVSRNav'
import { _nav as adminNav } from 'src/nav/AdminNav'
import { _nav as bzentyNav } from 'src/nav/BzentyNav'
import { _nav as counselorNav } from 'src/nav/CounselorNav'
import { _nav as scsbjtNav } from 'src/nav/SCSBJTNav'
import { _nav as studentNav } from 'src/nav/studentNav'


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const userGroup = localStorage.getItem('userGroupCd');

  let selectedNav;
  if (userGroup === '10') {
    selectedNav = adminNav
  } else if (userGroup === '20') {
    selectedNav = studentNav
  } else if (userGroup === '30') {
    selectedNav = acavsrNav
  } else if (userGroup === '40') {
    selectedNav = scsbjtNav
  } else if (userGroup === '50') {
    selectedNav = bzentyNav
  } else if (userGroup === '60') {
    selectedNav = counselorNav
  }
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={selectedNav} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
