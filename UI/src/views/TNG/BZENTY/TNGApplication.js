import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react'


const Layout = () => {
  localStorage.getItem("userGroupCd")
  const navigate = useNavigate()

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
  const [visible, setVisible] = useState(false) // 상태 변수 추가

  const handleModalClose = () => {
    navigate('/tngList');
  };

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
    if (year === '') {
      alert("연도를 입력하세요.")
    } else if (semester === '') {
      alert("학기를 입력하세요.")
    } else if (tngNope === '') {
      alert("인원수를 입력하세요.")
    } else if (tngStYmd === '') {
      alert("실습 시작일을 입력하세요.")
    } else if (tngEndYmd === '') {
      alert("실습 종료일을 입력하세요.")
    } else if (aplyEndDt === '') {
      alert("신청 종료일을 입력하세요.")
    } else if (ttlTngHr === '') {
      alert("총 실습 시간을 입력하세요.")
    } else if (tkcgTaskNm === '') {
      alert("담당 업무를 입력하게요.")
    } else {
      const yearAndSemesterValue = `${year} ${semester}`;
      setYearAndSemester(yearAndSemesterValue);
      if (yearAndSemesterValue != null) {
        fetch('/cbb/tng/aplyTng', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loginId, yearAndSemester, tngNope, tngStYmd, tngEndYmd, aplyEndDt, ttlTngHr, tkcgTaskNm }),
        })
          .then(response => response.json())
          .then(data => {
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
        setVisible(true);
      } else {
        alert('?')
      }
    }
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
      <ModalContent visible={visible} setVisible={setVisible} handleModalClose={handleModalClose} />
    </CRow>
  )
}

const ModalContent = ({ visible, onClose, handleModalClose }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>제출 완료</CModalTitle>
      </CModalHeader>
      <CModalBody>
        신청이 성공적으로 제출되었습니다.
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleModalClose}>
          닫기
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default Layout
