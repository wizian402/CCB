import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from "@coreui/react";

const Table = ({ currentItems }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 얻습니다.

  // 인라인 스타일 객체 정의
  const cellStyle = {
    padding: '10px 20px',
    textAlign: 'center'   
  };

  const handleCheckSchedule = (sonuselorId) => {
    navigate(`/Requestschedule/${sonuselorId}`); // 상태를 유지하면서 '/schedule' 페이지로 이동합니다.
  };
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col" style={cellStyle}>유형</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>상담원</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>상담 항목</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>성별</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>신청</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {currentItems.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell style={cellStyle}>{item.type}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{item.name}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{item.item}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{item.gender}</CTableDataCell>
            <CTableDataCell style={cellStyle}>
              <CButton color="primary" onClick={() => handleCheckSchedule(item.sonuselorId)}>
                시간표 확인
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Table;