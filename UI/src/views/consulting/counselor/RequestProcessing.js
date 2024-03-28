// ConsultationSchedule.js
import React, { useEffect, useState } from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagenation";
import Table from "./RequestProcessingTable";

const ScheduleCheck = () => {
  const [schedules, setschedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermItem, setSearchTermItem] = useState("");
  const [searchTermDate, setSearchTermDate] = useState("");
  const [searchTermTime, setSearchTermTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const id = localStorage.getItem("loginId");
    try {
      const response = await fetch(
        `/cbb/consulting/counselorSchedule?id=` + id
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setschedules(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredItems = schedules.filter((item) => {
    return (
      item.counselor.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.item.toLowerCase().includes(searchTermItem.toLowerCase()) &&
      item.consultationTime.includes(searchTermTime.toLowerCase()) &&
      item.consultationDate.includes(searchTermDate.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / perPage);

  return (
    <div>
      <h1 className="title">상담 신청 처리</h1>
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
              <strong>상담 시간표</strong>
            </CCardHeader>
            <CCardBody>
              <Table currentItems={currentItems} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageClick}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default ScheduleCheck;
