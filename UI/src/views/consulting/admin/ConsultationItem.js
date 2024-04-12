import React, { useEffect, useState } from "react";
import "../scss/ConsultationItem.scss";
import SearchInput from "../components/SearchInput";
import AddItemModal from "../components/ConsultationItem/AddItemModal";
import ItemTable from "../components/ConsultationItem/ItemTable";

const ConsultationItem = () => {
  const [counselingItems, setCounselingItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/cbb/consulting/items`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCounselingItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1 className="title">상담 항목</h1>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <ItemTable
        items={counselingItems}
        searchTerm={searchTerm}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage} // 페이지 변경 핸들러 전달
        totalPages={Math.ceil(
          (counselingItems || []).filter((item) =>
            searchTerm && item && item.conItems
              ? item.conItems.toLowerCase().includes(searchTerm.toLowerCase())
              : true
          ).length / itemsPerPage
        )}
      />

      <div
        className="modal-container"
        style={{
          marginTop: "-10px",
        }}
      >
        <AddItemModal className="centered"></AddItemModal>
      </div>
    </div>
  );
};

export default ConsultationItem;
