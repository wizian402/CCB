import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "src/assets/brand/logo-negative";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config

import { _nav as acavsrNav } from "src/nav/ACAVSRNav";
import { _nav as adminNav } from "src/nav/AdminNav";
import { _nav as bzentyNav } from "src/nav/BzentyNav";
import { _nav as counselorNav } from "src/nav/CounselorNav";
import { _nav as scsbjtNav } from "src/nav/SCSBJTNav";
import { _nav as bzentyTNGNav } from "src/nav/BzentyTNGNav";
import { _nav as adminTNGNav } from "src/nav/AdminTNGNav";
import { _nav as stdntAplyNav } from "src/nav/StdntAplyNav";
import { _nav as studentNav } from "src/nav/studentNav";
import { _nav as CAdmin } from "src/nav/consulting/Admin";
import { _nav as CCounselor } from "src/nav/consulting/Counselor";
import { _nav as CStudent } from "src/nav/consulting/Student";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const userGroup = localStorage.getItem("userGroupCd");

  const location = useLocation();

  const currentUri = location.pathname;
  console.log(currentUri);
  let selectedNav;

  if (currentUri === "/professorSelect") {
    selectedNav = scsbjtNav;
  } else if (
    currentUri === "/tngApplication" ||
    currentUri === "/tngAplyStdntList" ||
    currentUri === "/tngProgStdnt" ||
    currentUri === "/tngAttend" ||
    currentUri === "/tngRcd"
  ) {
    selectedNav = bzentyTNGNav;
  } else if (currentUri === "/tngList") {
    selectedNav = bzentyTNGNav;
  } else if (currentUri === "/tngApproval") {
    selectedNav = adminTNGNav;
  } else if (currentUri === "/stdntAply" || currentUri === "/stdntProgAply") {
    selectedNav = stdntAplyNav;
  } else if (currentUri.includes("/recruit/")) {
    selectedNav = studentNav;
  } else if (
    currentUri === "/consultationItem" ||
    currentUri === "/consultationSchedule" ||
    currentUri === "/11111111" ||
    currentUri === "/result"
  ) {
    selectedNav = CAdmin;
  } else if (currentUri === "/consultationRequest") {
    selectedNav = CStudent;
  } else if (
    currentUri === "/timeTable" ||
    currentUri === "/schedule" ||
    currentUri === "/processing"
  ) {
    selectedNav = CCounselor;
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" height={35} /> {/* 아이콘 */}
        <CIcon className="sidebar-brand-narrow" height={35} /> {/* 아이콘 */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={selectedNav} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
