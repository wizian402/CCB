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

const EditItemModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    itemID: props.item.itemID,
    item: props.item.item,
    use: props.item.use
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "/cbb/consulting/items/update",
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
        throw new Error("Failed to update item");
      }

      const responseData = await response.json();
      if (responseData === 1) {
        alert("수정되었습니다.");
        window.location.reload();
      } else {
        alert("다시 시도해주세요.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>항목 수정</CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>항목 수정</CModalTitle>
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
          <CButton color="secondary" onClick={() => setVisible(false)}>취소</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EditItemModal;
