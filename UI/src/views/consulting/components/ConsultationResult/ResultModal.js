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

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>자세히 보기</CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>상담 내역</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <p>유형: {item.type}</p>
            <p>상담원: {item.counselor}</p>
            <p>상담 항목: {item.item}</p>
            <p>학생: {item.student}</p>
            <p>상담일: {item.consultationDate.slice(0, 10)}</p>
            <p>상담 시간: {item.time}</p>
            <p>내용: {item.content}</p>
            <p>등록일: {item.creationDate.slice(0, 10)}</p>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Save changes</CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            닫기
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VerticallyCentered;
