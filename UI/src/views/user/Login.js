import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const Login = () => {
  const [loginId, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginId === "") {
        throw new Error("아이디를 입력하세요");
      } else if (password === "") {
        throw new Error("비밀번호를 입력하세요");
      }

      const loginResponse = await fetch("/cbb/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId, password }),
      });

      if (!loginResponse.ok) {
        let errorMessage = await loginResponse.text();
        if (errorMessage.startsWith("<!doctype")) {
          throw new Error(
            "아이디 또는 비밀번호가 틀립니다.\n5회 이상 틀릴시 계정이 잠깁니다."
          );
        } else {
          const errorData = JSON.parse(errorMessage);
          throw new Error(errorData.error);
        }
      }

      const data = await loginResponse.json();
      localStorage.setItem("userNo", data.userNo);
      localStorage.setItem("loginId", data.loginId);
      localStorage.setItem("userGroupCd", data.userGroupCd);

      naviagePage();
    } catch (error) {
      alert(error.message);
    }
  };

  const naviagePage = () => {
    const userGroupCd = localStorage.getItem("userGroupCd");

    switch (userGroupCd) {
      case "40":
        navigate("/professorSelect");
        break;
      case "50":
        navigate("/tngApplication");
        break;
      case "10":
        fetch("/cbb/tng/tkcgTaskCd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginId: loginId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.tkcgTaskCd === "10") {
              navigate("/tngApproval");
            } else if (data.tkcgTaskCd === "20") {
              navigate("/dashboard");
            } else if (data.tkcgTaskCd === "30") {
              navigate("/consultationSchedule");
            }
          })
          .catch((error) =>
            console.error("Error fetching fetchTkggTaskCd:", error)
          );
        break;
      case "20":
        navigate("/stdntAply");
        break;
      case "60":
        navigate("/schedule");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginSubmit}>
                    <h1>로그인</h1>
                    <p className="text-medium-emphasis">&nbsp;</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="아이디"
                        autoComplete="id"
                        onChange={(e) => setId(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          로그인
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgotPswd">
                          <CButton color="link" className="px-0">
                            비밀번호 찾기
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>OO 대학교</h2>
                    <p>현장 실습 관리</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
