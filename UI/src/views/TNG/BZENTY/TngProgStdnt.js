import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const TngProgStdnt = () => {
  const [tngNo, setTngNo] = useState(null);
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
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <TNGDetailModal selectedTng={selectedTng} onClose={handleModalClose} />
    </CRow>
  );
};

const TNGDetailModal = ({ selectedTng, onClose }) => {
  const handleApproval = () => {
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <CModal alignment="center" visible={selectedTng !== null} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>현장 실습 학생 선발</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable>
          <CTableBody>

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


export default TngProgStdnt;
