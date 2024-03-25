import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
const VerticallyCentered = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    scheduleId: item.scheduleId,
    itemId: item.itemId,
    studentId: localStorage.getItem("loginId"),
    counselorId: item.counselorId,
  });
  const handleSubmit = async () => {
    try {
      const response = await fetch("/cbb/consulting/request", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
      <CButton onClick={() => setVisible(!visible)}>신청</CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>상담 신청</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <p>상담원: {item.counselor} </p>
            <p>상담 항목: {item.item} </p>
            <p>상담일: {item.consultationDate.slice(0, 10)}</p>
            <p>상담 시간: {item.consultationTime}</p>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            저장
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            닫기
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VerticallyCentered;
