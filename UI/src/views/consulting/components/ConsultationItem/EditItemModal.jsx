import React, { useState, useEffect } from "react";

const EditItemModal = ({ showModal, onClose, selectedItem, fetchData }) => {
  const [editedItem, setEditedItem] = useState({ conItemsID: "", conItems: "", use: "" });

  useEffect(() => {
    if (selectedItem) {
      setEditedItem(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8181/cbb/consulting/items/update",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const responseData = await response.json();
      if (responseData === 1) {
        alert("수정되었습니다.");
        fetchData();
        onClose();
      } else {
        alert("다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    showModal && (
      <div className="modal1">
        <div className="modal-content">
          <h1>항목 수정</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="itemCode">항목 코드</label>
              <input
                type="text"
                id="itemCode"
                name="conItemsID"
                value={editedItem.conItemsID}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="itemName">상담 항목</label>
              <input
                type="text"
                id="itemName"
                name="conItems"
                value={editedItem.conItems}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="use">사용 여부</label>
              <select
                id="use"
                name="use"
                value={editedItem.use}
                onChange={handleChange}
              >
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
            <div className="buttons">
              <button type="submit" className="submit-button">
                수정
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cancel-button"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditItemModal;
