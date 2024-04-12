import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormTextarea,
} from "@coreui/react";

const VerticallyCentered = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState(""); // 상담 내용 상태 추가

  const handleSubmit = (reservationId) => {
    const url = `/cbb/consulting/ResultRegistration`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: reservationId,
        comment: comment, // 상담 내용 추가
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 서버 응답 처리
        console.log("서버 응답:", data);
        if (data >= 1) {
          alert("등록되었습니다.");
          window.location.reload();
        } else {
          alert("다시 시도해주세요.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        // 에러 처리
      });
  };

  return (
    <>
      <CButton
        onClick={() => {
          setVisible(!visible);
        }}
      >
        등록
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>상담 결과 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>학생</CTableHeaderCell>
                <CTableDataCell>{item.student}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>상담 항목</CTableHeaderCell>
                <CTableDataCell>{item.item}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>상담 내용</CTableHeaderCell>
                <CTableDataCell>
                  <CFormTextarea
                    placeholder="Leave a comment here"
                    id="comments"
                    floatingLabel="Comments"
                    style={{ height: "100px" }}
                    value={comment} // 상담 내용 상태 값 바인딩
                    onChange={(e) => setComment(e.target.value)} // 상담 내용 상태 업데이트
                  />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => handleSubmit(item.reservationId)}
          >
            등록
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
