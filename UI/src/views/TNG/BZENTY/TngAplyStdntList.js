import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react';

const TngAplyStdntList = () => {
  const [tngNo, setTngNo] = useState(null);
  const [stdntList, setStdntList] = useState([]);
  const [scsbjtList, setScsbjtList] = useState([]);
  const [sttstList, setSttsList] = useState([]);
  const [selectedTng, setSelectedTng] = useState(null);

  useEffect(() => {
    const selectedTngNo = sessionStorage.getItem("selectedTngNo");
    const userGroupCd = localStorage.getItem('userGroupCd');
    setTngNo(selectedTngNo);
    if (userGroupCd !== '50') {
      localStorage.clear()
      alert('로그인후 이용가능합니다.')
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (tngNo) {
      fetchStdntList();
      fetchScsbjt();
      fetchStdntStts();
    }
  }, [tngNo]);

  const fetchStdntList = () => {
    fetch('/cbb/tng/perStdnt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tngNo }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStdntList(data);
      })
      .catch(error => console.error('Error fetching student list:', error));
  };

  const fetchScsbjt = () => {
    fetch('/cbb/tng/getScsbjt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setScsbjtList(data)
      })
      .catch(error => console.error('Error fetching scsbjt list:', error));
  };

  const fetchStdntStts = () => {
    fetch('/cbb/tng/stdntStts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setSttsList(data)
      })
      .catch(error => console.error('Error fetching stdntStts list:', error));
  };

  const handleModalOpen = (selectedTng) => {
    setSelectedTng(selectedTng);
  };

  const handleModalClose = () => {
    setSelectedTng(null);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>현장 실습 신청 학생</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ width: '10%' }} className="text-center">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '15%' }} className="text-center">학생이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '15%' }} className="text-center">학과</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '15%' }} className="text-center">학년</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '15%' }} className="text-center">생년월일</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '15%' }} className="text-center">진행상태</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {stdntList.map((stdnt, index) => (
                  <CTableRow key={index} onClick={() => handleModalOpen(stdnt)}>
                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.stdntNm}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {scsbjtList.find(item => item.scsbjtCd === stdnt.scsbjtCd)?.scsbjtNm}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.stdntGrd}학년</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {stdnt.stdntBrdt && stdnt.stdntBrdt.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일')}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {stdnt.tngPrgrsStts}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <TNGDetailModal selectedTng={selectedTng} onClose={handleModalClose} scsbjtList={scsbjtList} />
    </CRow>
  );
};

const TNGDetailModal = ({ selectedTng, onClose, scsbjtList }) => {
  const handleApproval = () => {
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <CModal alignment="center" visible={selectedTng !== null} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>현장 실습 승인</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell>학생 이름:</CTableHeaderCell>
              <CTableDataCell>{selectedTng && selectedTng.stdntNm}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>학과:</CTableHeaderCell>
              <CTableDataCell>{selectedTng && scsbjtList.find(item => item.scsbjtCd === selectedTng.scsbjtCd)?.scsbjtNm}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>학년:</CTableHeaderCell>
              <CTableDataCell>{selectedTng && selectedTng.stdntGrd}학년</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>생년월일:</CTableHeaderCell>
              <CTableDataCell>
                {selectedTng && selectedTng.stdntBrdt &&
                  `${selectedTng.stdntBrdt.substring(0, 4)}년 ${parseInt(selectedTng.stdntBrdt.substring(4, 6), 10)}월 ${parseInt(selectedTng.stdntBrdt.substring(6, 8), 10)}일`
                }
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>연락처:</CTableHeaderCell>
              <CTableDataCell>{selectedTng && selectedTng.stdntTelNo && selectedTng.stdntTelNo.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleApproval}>승인</CButton>
        <CButton color="secondary" onClick={handleModalClose}>닫기</CButton>
      </CModalFooter>
    </CModal>
  );
};


export default TngAplyStdntList;
