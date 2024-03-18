import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
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
  CPagination,
  CPaginationItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react';

const TngList = () => {
  const navigate = useNavigate();
  const [tngList, setTngList] = useState([]);
  const [tngStts, setTngStts] = useState([]);
  const [bzentyNmList, setBzentyNmList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTng, setSelectedTng] = useState(null);

  useEffect(() => {
    const userGroupCd = localStorage.getItem('userGroupCd');
    if (userGroupCd !== '10') {
      localStorage.clear();
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      fetchTngList();
      fetchTngStatus();
      fetchBzentyNmList();
    }
  }, [currentPage, navigate]);

  const fetchTngList = () => {
    fetch('/cbb/tng/admPer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setTngList(data))
      .catch(error => console.error('Error fetching training list:', error));
  };

  const fetchTngStatus = () => {
    fetch('/cbb/tng/stts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setTngStts(data))
      .catch(error => console.error('Error fetching training status:', error));
  };

  const fetchBzentyNmList = () => {
    fetch('/cbb/tng/bzentyNmList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setBzentyNmList(data);
      })
      .catch(error => console.error('Error fetching bzentyNmList:', error));
  };

  const getStatusName = (code) => {
    const status = tngStts.find(item => item.cd === code);
    return status ? status.nm : '';
  };

  const getBzentyNm = (bzentyUserNo) => {
    const bzentyNmData = bzentyNmList.find(item => item.bzentyUserNo === bzentyUserNo);
    return bzentyNmData ? bzentyNmData.bzentyNm : '';
  };

  const handleModalOpen = (selectedTng) => {
    setSelectedTng(selectedTng);
  };

  const handleModalClose = () => {
    setSelectedTng(null);
  };

  const renderPaginationItems = () => {
    return Array.from({ length: Math.ceil(tngList.length / 10) }, (_, index) => (
      <CPaginationItem
        key={index}
        active={index + 1 === currentPage}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </CPaginationItem>
    ));
  };

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentTngList = tngList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>현장 실습 목록</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ width: '12%' }} className="text-center">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">산업체명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">담당 업무명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">실습 인원수</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">진행 상태</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentTngList.map((item, index) => (
                  <CTableRow key={index} onClick={() => handleModalOpen(item)}>
                    <CTableDataCell className="text-center">{indexOfFirstItem + index + 1}</CTableDataCell>
                    <CTableDataCell className="text-center">{getBzentyNm(item.bzentyUserNo)}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.tkcgTaskNm}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.tngNope}명</CTableDataCell>
                    <CTableDataCell className="text-center">{getStatusName(item.prgrsStts)}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CPagination className="justify-content-center" aria-label="Page navigation example">
              <CPaginationItem aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {renderPaginationItems()}
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
      <TNGDetailModal selectedTng={selectedTng} bzentyNmList={bzentyNmList} onClose={handleModalClose} />
    </CRow>
  );
};

const TNGDetailModal = ({ selectedTng, bzentyNmList, onClose }) => {
  const getBzentyNm = (bzentyUserNo) => {
    const bzentyNmData = bzentyNmList.find(item => item.bzentyUserNo === bzentyUserNo);
    return bzentyNmData ? bzentyNmData.bzentyNm : '';
  };

  return (
    <CModal alignment="center" visible={selectedTng !== null} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>현장 실습 승인</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>산업체 명: {selectedTng ? getBzentyNm(selectedTng.bzentyUserNo) : '-'}</p>
        <p>학기: {selectedTng ? selectedTng.semester : '-'}</p>
        <p>실습 인원수: {selectedTng ? selectedTng.tngNope : '-'}</p>
        <p>실습 시작일: {selectedTng ? selectedTng.tngStYMD : '-'}</p>
        <p>실습 종료일: {selectedTng ? selectedTng.tngEndYMD : '-'}</p>
        <p>신청 시작일: {selectedTng ? selectedTng.aplyStDt : '-'}</p>
        <p>신청 종료일: {selectedTng ? selectedTng.aplyEndDt : '-'}</p>
        <p>진행 상태: {selectedTng ? selectedTng.prgrsStts : '-'}</p>
        <p>총 실습시간: {selectedTng ? selectedTng.ttlTngHr : '-'}</p>
        <p>이수 기준 시간: {selectedTng ? selectedTng.cmcrsHr : '-'}</p>
        <p>담당 업무명: {selectedTng ? selectedTng.tkcgTaskNm : '-'}</p>
      </CModalBody>
    </CModal>
  );
};

export default TngList;
