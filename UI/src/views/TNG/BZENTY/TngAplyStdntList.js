import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem
} from '@coreui/react';

const TngAplyStdntList = () => {
  const location = useLocation();
  const [tngNo, setTngNo] = useState(null);

  useEffect(() => {
    const selectedTngNo = sessionStorage.getItem("selectedTngNo");
    setTngNo(selectedTngNo);
    console.log(selectedTngNo);

    // 페이지를 나갈 때 세션에서 selectedTngNo 삭제
    return () => {
      sessionStorage.removeItem("selectedTngNo");
    };
  }, []);

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
    </CRow>
  );
};

export default TngAplyStdntList;
