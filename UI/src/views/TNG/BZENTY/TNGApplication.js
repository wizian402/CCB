import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'


const Layout = () => {
  localStorage.getItem("userGroupCd")

  const [comNm, setComNm] = useState('')
  const [year, setYear] = useState('2024년')
  const [semester, setSemester] = useState('1학기')
  const [yearAndSemester, setYearAndSemester] = useState('')
  const [tngNope, setTngNope] = useState('')
  const [tngStYmd, setTngStYmd] = useState('')
  const [tngEndYmd, setTngEndYmd] = useState('')
  const [aplyEndDt, setAplyEndDt] = useState('')
  const [ttlTngHr, setTtlTngHr] = useState('')
  const [tkcgTaskNm, setTkcgTaskNm] = useState('') 
  const [loginId, setLoginId] = useState(localStorage.getItem('loginId'))

  useEffect(() => {
    fetch('/cbb/tng/companyNm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId }),
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setComNm(data.bzentyNm)
    })
    .catch(error => {
      // 에러 처리
      console.error('Error fetching company name:', error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const yearAndSemesterValue = `${year} ${semester}`;
    setYearAndSemester(yearAndSemesterValue);
    console.log(yearAndSemester)
    
    fetch('/cbb/tng/aplyTng', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, yearAndSemester, tngNope, tngStYmd, tngEndYmd, aplyEndDt, ttlTngHr, tkcgTaskNm }),
    })
    .then(response => {
    })
    .then(data => {
      // 성공적으로 처리한 경우 추가 작업을 수행할 수 있음
    })
    .catch(error => {
      // 에러 처리
      console.error('Error submitting form:', error);
    });
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>현장 실습 참여 신청</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputText" className="col-sm-2 col-form-label">
                  산업체명
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputText" style={{ width: '30%' }} value={comNm} readOnly />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="selectYear" className="col-sm-2 col-form-label">
                  연도
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="selectYear" style={{ width: '30%' }} onChange={(e) => setYear(e.target.value)} defaultValue="2024년">
                    <option>2024년</option>
                    <option>2025년</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="selectSemester" className="col-sm-2 col-form-label">
                  학기
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="selectSemester" style={{ width: '30%' }} onChange={(e) => setSemester(e.target.value)} defaultValue="1학기">
                    <option>1학기</option>
                    <option>2학기</option>
                  </CFormSelect>
                </CCol>
              </CRow>


                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    실습 인원수
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" id="inputText" style={{ width: '30%' }} onChange={(e) => setTngNope(e.target.value)} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
                      실습 시작일
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="date" id="inputDate" style={{ width: '30%' }} onChange={(e) => setTngStYmd(e.target.value)} />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    실습 종료일
                  </CFormLabel>
                  <CCol sm={10}>
                      <CFormInput type="date" id="inputDate" style={{ width: '30%' }} onChange={(e) => setTngEndYmd(e.target.value)} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    실습신청 종료일
                  </CFormLabel>
                  <CCol sm={10}>
                      <CFormInput type="date" id="inputDate" style={{ width: '30%' }} onChange={(e) => setAplyEndDt(e.target.value)} />
                   </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    총 실습 시간
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" id="inputText" style={{ width: '30%' }} onChange={(e) => setTtlTngHr(e.target.value)} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    담당 업무
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" id="inputText" style={{ width: '30%' }} onChange={(e) => setTkcgTaskNm(e.target.value)} />
                  </CCol>
                </CRow>
                <CButton type="submit">현장 실습 신청</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Layout
