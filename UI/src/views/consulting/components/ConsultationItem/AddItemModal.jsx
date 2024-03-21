import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect
} from "@coreui/react";

const AddItemModal = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemID: "",
    item: "",
    use: "Y"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "/cbb/consulting/items/insert",
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
        window.location.reload();
      } else {
        alert("다시 시도해주세요.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>등록</CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader closeButton style={{ backgroundColor: 'lightblue', color: 'white' }}>
          <CModalTitle>항목 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <CInputGroup className="mb-5">
              <CInputGroupText id="itemID">항목 코드</CInputGroupText>
              <CFormInput
                aria-describedby="itemID"
                name="itemID"
                value={formData.itemID}
                onChange={handleChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-5">
              <CInputGroupText id="item">상담 항목</CInputGroupText>
              <CFormInput
                aria-describedby="item"
                name="item"
                value={formData.item}
                onChange={handleChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-5">
              <CInputGroupText id="use">사용 여부</CInputGroupText>
              <CFormSelect 
                aria-label="Use"
                name="use"
                value={formData.use}
                onChange={handleChange}
              >
                <option value="Y">Y</option>
                <option value="N">N</option>
              </CFormSelect>
            </CInputGroup>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>저장</CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AddItemModal;
