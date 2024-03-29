import React from "react";
import CIcon from "@coreui/icons-react";
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
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

export const _nav = [
  {
    component: CNavTitle,
    name: "운영자",
  },
  {
    component: CNavGroup,
    name: "기본정보관리",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "코드관리",
        to: "#",
      },
      {
        component: CNavItem,
        name: "학기설정",
        to: "#",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "기업체관리",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "기업체정보관리",
        to: "/recruit/admin/AdComList",
      },
      {
        component: CNavItem,
        name: "채용공고승인",
        to: "/recruit/admin/AdNotAPRVPbanc",
      },
      {
        component: CNavItem,
        name: "입사요청메일링",
        to: "#",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "취업자원관리",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "취업관리학생조회",
        to: "#",
      },
      {
        component: CNavItem,
        name: "이력서조회",
        to: "#",
      }, {
        component: CNavItem,
        name: "구직활동조회",
        to: "#",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "채용정보관리",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "채용정보관리",
        to: "#",
      },
    ],
  },
];
