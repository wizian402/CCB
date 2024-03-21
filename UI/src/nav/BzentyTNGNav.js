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
    name: '산업체',
  },
  {
    component: CNavItem,
    name: '현장 실습 참여 신청',
    to: '/tngApplication',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '현장 실습 목록',
    to: '/tngList',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  }
]
