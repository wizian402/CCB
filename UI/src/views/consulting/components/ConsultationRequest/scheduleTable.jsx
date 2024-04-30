import React from "react";
import RequestModal from "../../student/RequestModal"
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
  // 인라인 스타일 객체 정의
  const cellStyle = {
    padding: '10px 20px', // 상하 10px, 좌우 20px 패딩
    textAlign: 'center'   // 텍스트 중앙 정렬
  };

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col" style={cellStyle}>상담 항목</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>상담일</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>상담 시간</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>등록 일자</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={cellStyle}>신청</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {currentItems.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell style={cellStyle}>{item.item}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{item.consultationDate.slice(0, 10)}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{item.consultationTime}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{item.creationDate.slice(0, 10)}</CTableDataCell>
            <CTableDataCell style={cellStyle}>
              <RequestModal item={item} />
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Table;
