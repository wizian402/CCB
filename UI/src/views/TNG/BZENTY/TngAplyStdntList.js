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
} from '@coreui/react';

const TngAplyStdntList = () => {
  const [tngNo, setTngNo] = useState(null);
  const [stdntList, setStdntList] = useState([]);

  useEffect(() => {
    const selectedTngNo = sessionStorage.getItem("selectedTngNo");
    setTngNo(selectedTngNo);
  }, []);

  useEffect(() => {
    if (tngNo) {
      fetchStdntList();
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
        setStdntList(data);
      })
      .catch(error => console.error('Error fetching student list:', error));
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
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.stdntNm}</CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.department}</CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.stdntGrd}</CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.stdntBrdt}</CTableDataCell>
                    <CTableDataCell className="text-center">{stdnt.status}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default TngAplyStdntList;
