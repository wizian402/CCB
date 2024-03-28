// Table.js
import React from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton, // 추가: CoreUI의 버튼 컴포넌트
} from "@coreui/react";
import Modal from "./ResultRegistrationModal"
const Table = ({ currentItems }) => {
  console.log(currentItems)
  // 상담 취소 함수
  // const cancelConsultation = (id) => {
  //     const url = `/cbb/consulting/counselorSchedule/`; 
  //     // fetch API를 사용하여 POST 요청 보내기
  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(id),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // 서버 응답 처리
  //         console.log("서버 응답:", data);
  //         if (data == 1) {
  //           alert("등록되었습니다.");
  //           window.location.reload(); 
  //         }else {
  //           alert("다시 시도해주세요.");
  //           window.location.reload(); 
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was an error!", error);
  //         // 에러 처리
  //       });

  // };

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">학생</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담 항목</CTableHeaderCell>
          <CTableHeaderCell scope="col">상담일</CTableHeaderCell>
          <CTableHeaderCell scope="col">시간</CTableHeaderCell>
          <CTableHeaderCell scope="col">등록</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {currentItems.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.student}</CTableDataCell>
            <CTableDataCell>{item.item.slice(0, 10)}</CTableDataCell>
            <CTableDataCell>{item.consultationDate.slice(0, 10)}</CTableDataCell>
            <CTableDataCell>{item.consultationTime}</CTableDataCell>
            <CTableDataCell>
              <Modal item = {item}></Modal>  
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Table;
