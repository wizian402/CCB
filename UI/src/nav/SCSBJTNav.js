import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const _nav = [
  {
    component: CNavTitle,
    name: '학과',
  },
  {
    component: CNavItem,
    name: '지도교수 배정',
    to: '/professorSelect',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  }
]
