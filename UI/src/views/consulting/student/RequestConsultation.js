import React, { useEffect, useState } from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";

import Pagination from "../components/Pagenation";
import Table from "../components/ConsultationRequest/counselorTable";
import SearchBar from "./SearchBar";

const ConsultationSchedule = () => {
  const [counselor, setCounselor] = useState([]);
  const [searchTermItem, setSearchTermItem] = useState("");
  const [searchTermName, setSearchTermName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/cbb/consulting/counselor`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCounselor(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredItems = counselor.filter((item) => {
    const nameMatch = item.name.includes(searchTermName);
    const itemMatch = item.item.includes(searchTermItem);
    return nameMatch && itemMatch;
  });

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / perPage);

  return (
    <div>
      <h1 className="title">상담 신청</h1>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ marginTop: "20px" }}>
            <CCardHeader>
              <strong>상담원 목록</strong>
            </CCardHeader>
            <CCardBody>
              <SearchBar
                searchTermName={searchTermName}
                setSearchTermName={setSearchTermName}
                searchTermItem={searchTermItem}
                setSearchTermItem={setSearchTermItem}
              />
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

export default ConsultationSchedule;
  