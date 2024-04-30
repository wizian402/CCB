// ConsultationSchedule.js
import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CCardBodyCTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import { useParams } from "react-router-dom";

import Pagination from "../components/Pagenation";
import Table from "../components/ConsultationRequest/scheduleTable";

const ConsultationSchedule = () => {
  const { sonuselorId } = useParams();
  const [counselor, setCounselor] = useState([]);
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
    try {
      const response = await fetch(
        `/cbb/consulting/studentSchedule?id=` + sonuselorId
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCounselor(data);
      console.log(counselor)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredItems = counselor.filter((item) => {
    return (
      item.counselor.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.item.toLowerCase().includes(searchTermItem.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / perPage);

  return (
    <div>
      <h1 className="title">상담 시간표 조회</h1>

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

export default ConsultationSchedule;
