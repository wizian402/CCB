import React from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CButton } from "@coreui/react"; // CoreUI의 컴포넌트를 import합니다.
import EditItemModal from "./EditItemModal";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";

const ItemTable = ({ items, searchTerm, currentPage, itemsPerPage}) => {
    const filteredItems = items.filter((item) =>
        searchTerm && item.conItems ? item.conItems.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );

    // 페이지에 맞는 아이템들을 가져옵니다.
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
                    {/* 현재 페이지에 표시할 아이템들을 매핑합니다. */}
                    {currentItems.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableHeaderCell>{item.itemID}</CTableHeaderCell>
                            <CTableHeaderCell>{item.item}</CTableHeaderCell>
                            <CTableHeaderCell>{item.use}</CTableHeaderCell>
                            <CTableHeaderCell>{item.creationDate.slice(0, 10)}</CTableHeaderCell>
                            <CTableHeaderCell>{item.modificationDate.slice(0, 10)}</CTableHeaderCell>
                            <CTableHeaderCell>
                                <EditItemModal item = {item}></EditItemModal>
                            </CTableHeaderCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        </div>
    );
};

export default ItemTable;
