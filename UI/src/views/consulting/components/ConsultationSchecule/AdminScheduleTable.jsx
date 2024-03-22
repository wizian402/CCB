// Table.js
import React from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

const Table = ({ currentItems }) => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">유형</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담원</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담 항목</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담 시간</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담일</CTableHeaderCell>
          <CTableHeaderCell scope="col">등록일</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {currentItems.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.type}</CTableDataCell>
            <CTableDataCell>{item.counselor}</CTableDataCell>
            <CTableDataCell>{item.item}</CTableDataCell>
            <CTableDataCell>{item.consultationTime}</CTableDataCell>
            <CTableDataCell>{item.consultationDate.slice(0, 10)}</CTableDataCell>
            <CTableDataCell>{item.creationDate.slice(0, 10)}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Table;
