import React, { useEffect, useState } from "react";
import "./scss/ConsultationItem.scss";
import Pagination from "./components/Pagenation"; // Pagination 컴포넌트를 import합니다.
import SearchInput from "./components/SearchInput"; // Pagination 컴포넌트를 import합니다.

const Test = () => {
  // 상태 변수들을 선언합니다.
  const [counselingItems, setCounselingItems] = useState([]); // 상담 항목 데이터를 저장할 상태 변수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장할 상태 변수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 저장할 상태 변수
  const [itemsPerPage] = useState(10); // 한 페이지당 표시할 항목 수
  const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부를 저장할 상태 변수
  const [selectedItem, setSelectedItem] = useState(null);

  // 페이지가 변경될 때마다 데이터를 가져오는 함수를 실행합니다.
  useEffect(() => {
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 실행됩니다.

  // API에서 데이터를 가져오는 비동기 함수입니다.
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

  // 검색어를 변경하는 함수입니다.
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // 페이지 번호를 클릭했을 때 해당 페이지로 이동하는 함수입니다.
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색어로 필터링된 항목들을 가져오는 코드입니다.
  const filteredItems = counselingItems.filter((item) =>
    item.conItems.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 현재 페이지에 따라 표시할 항목들을 가져오는 코드입니다.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수를 계산합니다.
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 수정 모달을 열고 선택된 항목 정보를 설정하는 함수입니다.
  const openEditModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // 모달 창을 열고 닫는 함수입니다.
  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedItem(null);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event, action) => {
    event.preventDefault(); // 기본 제출 동작 방지

    // 폼 데이터를 수집합니다.
    // 이벤트 객체를 통해 폼 요소를 찾습니다.
    const form = event.target.form;
    const itemCodeInput = form.querySelector("#itemCode");
    const itemNameInput = form.querySelector("#itemName");
    const useSelect = form.querySelector("#use");

    if (!itemCodeInput || !itemNameInput || !useSelect) {
      console.error("Form elements not found");
      return;
    }

    const formData = {
      conItemsID: itemCodeInput.value,
      conItems: itemNameInput.value,
      use: useSelect.value,
    };

    let url = "";
    let successMessage = "";
    try {
      switch (action) {
        case "insert":
          url = "http://localhost:8181/cbb/consulting/items/insert";
          successMessage = "등록되었습니다.";
          break;
        case "update":
          url = "http://localhost:8181/cbb/consulting/items/update";
          successMessage = "수정되었습니다.";
          break;
        case "delete":
          url = "http://localhost:8181/cbb/consulting/items/delete/";
          successMessage = "삭제되었습니다.";
          break;
        default:
          throw new Error("Unsupported action");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to perform action");
      }

      const responseData = await response.json(); // JSON 형식의 응답 데이터를 파싱

      if (responseData === 1) {
        alert(successMessage);
        window.location.reload();
      } else {
        alert("다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  // JSX를 반환합니다.
  return (
    <div>
      <h1 className="title">상담 항목</h1>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      {/* 모달 창 */}
      {showModal && (
        <div className="modal1">
          <div className="modal-content">
            <h1>항목 등록</h1>
            <form className="form-container" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="itemCode">항목 코드</label>
                <input type="text" id="itemCode" />
              </div>
              <div className="form-group">
                <label htmlFor="itemName">상담 항목</label>
                <input type="text" id="itemName" />
              </div>
              <div className="form-group">
                <label htmlFor="use">사용 여부</label>
                <select id="use">
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </select>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "insert")}
                  className="submit-button"
                >
                  등록
                </button>

                <button onClick={toggleModal} className="cancel-button">
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showModal && selectedItem && (
        <div className="modal1">
          <div className="modal-content">
            <h1>항목 수정</h1>
            <form className="form-container" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="itemCode">항목 코드</label>
                <input
                  type="text"
                  id="itemCode"
                  value={selectedItem.conItemsID}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemName">상담 항목</label>
                <input
                  type="text"
                  id="itemName"
                  value={selectedItem.conItems}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      conItems: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="use">사용 여부</label>
                <select
                  id="use"
                  value={selectedItem.use}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, use: e.target.value })
                  }
                >
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </select>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "update")}
                  className="submit-button"
                >
                  수정
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "delete")}
                  className="delete-button"
                >
                  삭제
                </button>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="cancel-button"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="item-table">
        <thead className="table-header">
          <tr>
            <th>항목 코드</th>
            <th>상담 항목</th>
            <th>사용 여부</th>
            <th>등록 일자</th>
            <th>수정 일자</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.conItemsID}</td>
              <td>{item.conItems}</td>
              <td>{item.use}</td>
              <td>{item.creationDate.slice(0, 10)}</td>
              <td>{item.modificationDate.slice(0, 10)}</td>
              <td>
                <button
                  className="editButton"
                  onClick={() => openEditModal(item)}
                >
                  수정
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
      />
      <button onClick={toggleModal} className="registerButton">
        등록
      </button>
    </div>
  );
};

export default Test;
