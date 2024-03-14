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
  const [newPswd, setPswd] = useState('')
  const [repeatPswd, setRepeatPswd] = useState('')
  const userId = sessionStorage.getItem('userId')

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    console.log(userId)
    e.preventDefault()
    if (newPswd !== repeatPswd) {
      alert('비밀번호와 동일하지 않습니다.')
    } else {
      fetch('/cbb/user/changePswd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newPswd }),
      })
        .then(response => {
          return response.text()
        })
        .then(data => {
          sessionStorage.clear()
          navigate('/login')
        })
        .catch(error => {
        });
    }
  }
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
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="새로운 비밀번호"
                      value={newPswd}
                      onChange={(e) => setPswd(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="새로운 비밀번호 확인"
                      value={repeatPswd}
                      onChange={(e) => setRepeatPswd(e.target.value)}
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
