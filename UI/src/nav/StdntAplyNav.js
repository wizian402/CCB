import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const _nav = [
  {
    component: CNavItem,
    name: '현장실습 목록',
    to: '/stdntAply',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '진행중인 현장실습',
    to: '/stdntProgAply',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  }
]
