// Table.js
import React from "react";
import RequestModal from "../../RequestModal"
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
  console.log(currentItems)
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">상담 항목</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담일</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담 시간</CTableHeaderCell>
          <CTableHeaderCell scope="col">등록 일자</CTableHeaderCell>
          <CTableHeaderCell scope="col">신청</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {currentItems.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.item}</CTableDataCell>
            <CTableDataCell>{item.consultationDate.slice(0, 10)}</CTableDataCell>
            <CTableDataCell>{item.consultationTime}</CTableDataCell>
            <CTableDataCell>{item.creationDate.slice(0, 10)}</CTableDataCell>
            <CTableDataCell>
                <RequestModal item = {item}/>     
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Table;
