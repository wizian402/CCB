import React, { useState } from "react";

const AddItemModal = ({ showModal, onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    conItemsID: "",
    conItems: "",
    use: "Y",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8181/cbb/consulting/items/insert",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const responseData = await response.json();
      if (responseData === 1) {
        alert("등록되었습니다.");
        fetchData();
        onClose();
      } else {
        alert("다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    showModal && (
      <div className="modal1">
        <div className="modal-content">
          <h1>항목 등록</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="itemCode">항목 코드</label>
              <input
                type="text"
                id="itemCode"
                name="conItemsID"
                value={formData.conItemsID}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="itemName">상담 항목</label>
              <input
                type="text"
                id="itemName"
                name="conItems"
                value={formData.conItems}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="use">사용 여부</label>
              <select
                id="use"
                name="use"
                value={formData.use}
                onChange={handleChange}
              >
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
            <div className="buttons">
              <button type="submit" className="submit-button">
                등록
              </button>
              <button onClick={onClose} className="cancel-button">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddItemModal;

