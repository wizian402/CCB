import { React, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { logo } from "src/assets/brand/logo";
import HeaderNavItem from "./head/HeaderNavItem";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const navigate = useNavigate();
  const [tkcgTaskCd, setTkcgTaskCd] = useState("");


  const handleLogout = () => {
    localStorage.clear();

    fetch("/cbb/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/login");
  };
  useEffect(() => {
    const fetchTkcgTaskCd = () => {
      const loginId = localStorage.getItem("loginId");
      fetch("/cbb/tng/tkcgTaskCd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId: loginId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTkcgTaskCd(data);
        })
        .catch((error) =>
          console.error("Error fetching fetchTkggTaskCd:", error)
        );
    };

    fetchTkcgTaskCd();
  }, []);

    const userGroup = localStorage.getItem("userGroupCd");
    let menuItems;
    let HeaderNavComponent;
    if (userGroup === "10") {
        let menuItems;
      if (tkcgTaskCd.tkcgTaskCd === "10") {
        menuItems = [{ name: "현장 실습 참여 관리", link: "/tngApproval" }];
      } else if (tkcgTaskCd.tkcgTaskCd === "20") {
        menuItems = [{ name: "취업 지원 관리", link: "/recruit/admin"}];
      } else {

        menuItems = [
          { name: "담당자", link: "/" },
          { name: "담당자", link: "/" },
          { name: "담당자", link: "/" },
          { name: "상담 관리", link: "/consultationItem" },
          { name: "현장 실습 참여 관리", link: "/tngApproval" },
        ];
      }

      HeaderNavComponent = <HeaderNavItem navItem={menuItems} />;
    } else if (userGroup === "20") {
      menuItems = [
        { name: "현장 실습", link: "/stdntAply" },
        { name: "취업 활동", link: "/recruit/TablePbanc" },
        { name: "상담 신청", link: "/consultationRequest" },
      ];
      HeaderNavComponent = <HeaderNavItem navItem={menuItems} />;
    } else if (userGroup === "30") {
      menuItems = [{ name: "현장 실습 관리", link: "/" }];
      HeaderNavComponent = <HeaderNavItem navItem={menuItems} />;
    } else if (userGroup === "40") {
      menuItems = [{ name: "지도 교수 배정", link: "/professorSelect" }];
      HeaderNavComponent = <HeaderNavItem navItem={menuItems} />;
    } else if (userGroup === "50") {
      menuItems = [

        { name: "현장 실습 관리", link: "/tngApplication" },
        { name: "채용 정보 관리", link: "/recruit/bzRecruit/WritePbanc" },
        { name: "기업 정보 관리", link: "/" },

      ];
      HeaderNavComponent = <HeaderNavItem navItem={menuItems} />;
    } else if (userGroup === "60") {
      menuItems = [{ name: "상담 관리", link: "/schedule" }];

      HeaderNavComponent = <HeaderNavItem navItem={menuItems} />;
    }

    return (
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          {HeaderNavComponent}
          <CHeaderNav>
            <CNavItem>
              <CNavLink onClick={handleLogout}>Logout</CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    );
  };

  export default AppHeader;
