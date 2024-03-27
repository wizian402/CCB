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
    name: "상담 관리",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "상담 시간표 조회",
        to: "/consultationSchedule",
      },
      {
        component: CNavItem,
        name: "상담 항목 관리",
        to: "/consultationItem",
      },
      {
        component: CNavItem,
        name: "상담원 관리",
        to: "#",
      },
      {
        component: CNavItem,
        name: "학생 상담 종합 이력",
        to: "/resultList",
      },
    ],
  },
];
