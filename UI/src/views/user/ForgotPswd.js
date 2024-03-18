import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
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

const Register = () => {
  const [loginId, setLoginId] = useState('')
  const [userNm, setUserNm] = useState('')
  const [telNo, setTelNo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginId === '') {
      alert("아이디를 입력하세요")
    } else if (!/^[a-zA-Z0-9]+$/.test(loginId)) {
      alert("아이디는 숫자와 영어 문자만 입력해야 합니다");
    } else if (userNm === '') {
      alert("이름을 입력하세요")
    } else if (!/^[가-힣]+$/.test(userNm)) {
      alert("이름은 한글만 입력해야 합니다");
    } else if (telNo === '') {
      alert("전화번호를 입력하세요")
    } else if (telNo.length !== 11) {
      alert("전화번호는 11자리여야 합니다");
    } else if (isNaN(telNo)) {
      alert("전화번호는 숫자만 입력해야 합니다");
    } else {
      fetch('/cbb/user/findPswd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, userNm, telNo }),
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          if (data === "success") {
            sessionStorage.setItem('userId', loginId);
            navigate('/changePswd');
          } else {
            alert("일치하는 회원정보가 없습니다.");
          }
        })
        .catch(error => {
          alert("일치하는 회원정보가 없습니다.");
        });
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>비밀번호 찾기</h1>
                  <p className="text-medium-emphasis">아이디, 이름, 전화번호를 입력하세요.</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="아이디"
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="이름"
                      value={userNm}
                      onChange={(e) => setUserNm(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="전화번호"
                      value={telNo}
                      onChange={(e) => setTelNo(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol>
                      <CButton color="primary" type="submit" className="w-100 text-white fw-bold">
                        비밀번호 찾기
                      </CButton>
                    </CCol>
                    <CCol>
                      <Link to="/login">
                        <CButton color="danger" className="w-100 text-white fw-bold">
                          비밀번호 찾기 취소
                        </CButton>
                      </Link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
