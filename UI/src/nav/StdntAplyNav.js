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
    component: CNavTitle,
    name: '학생',
  },
  {
    component: CNavItem,
    name: '현장실습 목록',
    to: '/stdntAply',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  }
]
