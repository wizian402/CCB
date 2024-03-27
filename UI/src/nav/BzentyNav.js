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
    component: CNavGroup,
    name: '채용정보관리',
    to: '#',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '채용정보조회 및 수정',
        to: '/base/TablesResume',
      },
      {
        component: CNavItem,
        name: '채용정보조회 등록신청',
        to: '/recruit/bzRecruit/WritePbanc',
      }, {
        component: CNavItem,
        name: '등록대기공고확인',
        to: '/base/TablesResume',
      }
    ]
  }, {
    component: CNavGroup,
    name: '지원자관리',
    to: '#',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '지원자조회',
        to: '#',
      },

    ]
  }, {
    component: CNavGroup,
    name: '인재검색',
    to: '#',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '인재검색',
        to: '#',
      }
    ]
  }
]
