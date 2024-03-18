import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilDescription,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

export const _nav = [
  {
    component: CNavTitle,
    name: '현장실습 담당자',
  },
  {
    component: CNavItem,
    name: '현장 실습 참여 관리',
    to: '/tngApproval',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  }
];
