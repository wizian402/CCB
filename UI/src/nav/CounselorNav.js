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
    name: "상담원",
  },
  {
    component: CNavGroup,
    name: "상담 관리",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "상담 시간표 조회",
        to: "#",
      },
      {
        component: CNavItem,
        name: "상담 시간표 등록",
        to: "/schedule",
      },
      {
        component: CNavItem,
        name: "상담 신청 처리",
        to: "#",
      },
      {
        component: CNavItem,
        name: "상담 결과 등록",
        to: "#",
      },
    ],
  },
];
