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

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    const savedUserId = sessionStorage.getItem('loginId');
    console.log('저장된 아이디:', savedUserId);
  }
  const test = () => {
    const savedUserId = sessionStorage.getItem('loginId');
    console.log('저장된 아이디:', savedUserId);
  };
  const deleteSession = () => {
    sessionStorage.clear();
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>비밀번호 변경</h1>
                  <p className="text-medium-emphasis">새로운 비밀번호를 입력하세요.</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="새로운 비밀번호"
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="새로운 비밀번호 확인"
                      value={userNm}
                      onChange={(e) => setUserNm(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol>
                      <CButton color="primary" type="submit" className="w-100 text-white fw-bold">
                        비밀번호 변경
                      </CButton>
                    </CCol>
                    <CCol>
                      <Link to="/login">
                        <CButton color="danger" className="w-100 text-white fw-bold" onClick={deleteSession}>
                          비밀번호 변경 취소
                        </CButton>
                      </Link>
                    </CCol>
                  </CRow>
                  <CButton color="link" className="px-0" onClick={test}>
                    비밀번호 찾기
                  </CButton>
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
