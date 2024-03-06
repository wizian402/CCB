import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [userGroupCd, setUserGroupCd] = useState('')
  const [pswd, setPswd] = useState('')
  const [repeatPswd, setRepeatPswd] = useState('')
  var regId = /^[a-zA-Z0-9]{4,12}$/
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(pswd !== repeatPswd){
      alert('비밀번호와 동일하지 않습니다.')
    } else if(!regId.test(loginId)){
      alert('4~12자 영문 대소문자, 숫자만 입력하세요.')
    } else {
      fetch('/wlms/user/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, pswd, userGroupCd }),
      })
      .then(response => {
        return response.text()
      })
      .then(data => {
        if (data == 'success') {
          console.log(data)
          navigate('/dashboard')
        } else{
          console.log(data)
          alert('이미 존재하는 아이디입니다.')
        }
      })
      .catch(error => {
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
                  <h1>회원가입</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="id"
                      autoComplete="id"
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="memberGroup"
                      autoComplete="memberGroup"
                      value={userGroupCd}
                      onChange={(e) => setUserGroupCd(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="password"
                      autoComplete="new-password"
                      value={pswd}
                      onChange={(e) => setPswd(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repeatPswd}
                      onChange={(e) => setRepeatPswd(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
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
