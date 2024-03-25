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

  const handleCheckSchedule = (sonuselorId) => {
    navigate(`/Requestschedule/${sonuselorId}`); // 상태를 유지하면서 '/schedule' 페이지로 이동합니다.
  };
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">유형</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담원</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담 항목</CTableHeaderCell>
          <CTableHeaderCell scope="col">성별</CTableHeaderCell>
          <CTableHeaderCell scope="col">신청</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {currentItems.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.type}</CTableDataCell>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>{item.item}</CTableDataCell>
            <CTableDataCell>{item.gender}</CTableDataCell>
            <CTableDataCell>
              {/* '신청' 버튼 */}
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
