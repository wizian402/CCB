import React, { useEffect, useState } from "react";
import "./scss/ConsultationItem.scss";
import Pagination from "./components/Pagenation";
import SearchInput from "./components/SearchInput";
import AddItemModal from "./components/ConsultationItem/AddItemModal";
import EditItemModal from "./components/ConsultationItem/EditItemModal";
import ItemTable from "./components/ConsultationItem/ItemTable";

const ConsultationItem = () => {
  const [counselingItems, setCounselingItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8181/cbb/consulting/items`
      );
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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h1 className="title">상담 항목</h1>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <AddItemModal
        showModal={showAddModal}
        onClose={closeAddModal}
        fetchData={fetchData}
      />
      <EditItemModal
        showModal={showEditModal}
        onClose={closeEditModal}
        selectedItem={selectedItem}
        fetchData={fetchData}
      />
      <ItemTable
        items={counselingItems}
        searchTerm={searchTerm}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        openEditModal={openEditModal}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(
          (counselingItems || []).filter((item) =>
            searchTerm && item && item.conItems
              ? item.conItems.toLowerCase().includes(searchTerm.toLowerCase())
              : true
          ).length / itemsPerPage
        )}
        onPageChange={handlePageClick}
      />
      <button onClick={openAddModal} className="registerButton">
        등록
      </button>
    </div>
  );
};

export default ConsultationItem;
