import React from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from "@coreui/react";
import EditItemModal from "./EditItemModal";
import Pagination from "../Pagenation";

const ItemTable = ({ items, searchTerm, currentPage, itemsPerPage, onPageChange, totalPages }) => {
  const filteredItems = items.filter((item) =>
    searchTerm && item.conItems ? item.conItems.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ marginTop: "20px" }}>
            <CCardHeader>
              <strong>상담 시간표</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">항목 코드</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상담 항목</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용 여부</CTableHeaderCell>
                    <CTableHeaderCell scope="col">등록일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">수정일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">수정</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentItems.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{item.itemID}</CTableDataCell>
                      <CTableDataCell>{item.item}</CTableDataCell>
                      <CTableDataCell>{item.use}</CTableDataCell>
                      <CTableDataCell>{item.creationDate.slice(0, 10)}</CTableDataCell>
                      <CTableDataCell>{item.modificationDate.slice(0, 10)}</CTableDataCell>
                      <CTableDataCell>
                        <EditItemModal item={item}></EditItemModal>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div style={{display : "flex" , justifyContent : "center" , marginTop : "30px"}}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default ItemTable;
