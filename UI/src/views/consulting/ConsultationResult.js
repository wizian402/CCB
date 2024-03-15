import React, { useEffect, useState } from "react";
import Modal from "./components/ConsultationResult/ResultModal";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
} from "@coreui/react"; // CoreUI 컴포넌트를 import합니다.
import SearchFilters from "./components/SearchFilters";
import Pagination from "./components/Pagenation";

const StudentResult = () => {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermItem, setSearchTermItem] = useState("");
  const [searchTermDate, setSearchTermDate] = useState("");
  const [searchTermTime, setSearchTermTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8181/cbb/consulting/result`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchItem = (event) => {
    setSearchTermItem(event.target.value);
  };

  const handleSearchTime = (event) => {
    setSearchTermTime(event.target.value);
  };

  const handleSearchDate = (event) => {
    setSearchTermDate(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  const filteredItems =
    result.length > 0
      ? result.filter((item) => {
          return (
            item.counselor.toLowerCase().includes(searchTerm.toLowerCase()) &&
            item.item.toLowerCase().includes(searchTermItem.toLowerCase()) &&
            (item.consultationTime?.includes(searchTermTime.toLowerCase()) ||
              !searchTermTime) &&
            (item.consultationDate?.includes(searchTermDate.toLowerCase()) ||
              !searchTermDate)
          );
        })
      : [];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / perPage);

  return (
    <div>
      <h1 className="title">학생 상담 종합 이력</h1>
      <SearchFilters
        handleSearchItem={handleSearchItem}
        handleSearchDate={handleSearchDate}
        handleSearchTime={handleSearchTime}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ marginTop: "20px" }}>
            <CCardHeader>
              <strong>학생 상담 종합 이력</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">유형</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상담원</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상담 항목</CTableHeaderCell>
                    <CTableHeaderCell scope="col">학생</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상담일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상담 시간</CTableHeaderCell>
                    <CTableHeaderCell scope="col">내용</CTableHeaderCell>
                    <CTableHeaderCell scope="col">등록일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">자세히 보기</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentItems.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{item.type}</CTableDataCell>
                      <CTableDataCell>{item.counselor}</CTableDataCell>
                      <CTableDataCell>{item.item}</CTableDataCell>
                      <CTableDataCell>{item.student}</CTableDataCell>
                      <CTableDataCell>
                        {item.consultationDate.slice(0, 10)}
                      </CTableDataCell>
                      <CTableDataCell>{item.time}</CTableDataCell>
                      <CTableDataCell>
                        {item.content.length > 20
                          ? `${item.content.slice(0, 20)}...`
                          : item.content}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.creationDate.slice(0, 10)}
                      </CTableDataCell>
                      <CTableDataCell>
                        <Modal item={item} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default StudentResult;
