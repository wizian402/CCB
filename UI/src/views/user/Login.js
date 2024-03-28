import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'



const Login = () => {
  const [loginId, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginSubmit = (e) => {
    e.preventDefault();

    if (loginId === '') {
      alert("아이디를 입력하세요")
    } else if (password === '') {
      alert("비밀번호를 입력하세요")
    } else {
      fetch('/cbb/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return response.text().then(errorMessage => {
              if (errorMessage.startsWith('<!doctype')) {
                throw new Error('아이디 또는 비밀번호가 틀립니다.\n5회 이상 틀릴시 계정이 잠깁니다.');
              } else {
                const errorData = JSON.parse(errorMessage);
                throw new Error(errorData.error);
              }
            });
          }
        })
        .then(data => {
          fetchTkcgTaskCd();
          localStorage.setItem('userNo', data.userNo); // 학생 취업 지원 상태 위해서 추가 by송양민
          localStorage.setItem('loginId', data.loginId);
          localStorage.setItem('userGroupCd', data.userGroupCd);
          if (localStorage.getItem("userGroupCd") === "40") {
            navigate('/professorSelect');
          } else if (localStorage.getItem("userGroupCd") === "50") {
            navigate('/tngApplication');
          }

          // else if (localStorage.getItem("userGroupCd") === "10"){
          //   navigate('/recruit/admin')
          // } 

          else if (localStorage.getItem("userGroupCd") === "10") {
            navigate('/tngApproval');
          } else if (localStorage.getItem("userGroupCd") === "20") {
            navigate('/stdntAply');
          } else if (localStorage.getItem("userGroupCd") === "60") {
            navigate('/schedule');
          }
          else {
            navigate('/dashboard');
          }
        })
        .catch(error => {
          alert(error.message);
        });
    }

  }
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
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>OO 대학교</h2>
                    <p>
                      현장 실습 관리
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
