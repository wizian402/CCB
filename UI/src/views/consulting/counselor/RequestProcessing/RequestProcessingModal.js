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
} from "@coreui/react";
const VerticallyCentered = ({ scheduleId }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]); // 데이터 상태 추가

  const fetchData = async () => {
    try {
      const response = await fetch("/cbb/consulting/processing", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleId),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleSubmit = (reservationId) => {
    console.log(scheduleId);
    console.log(reservationId);
    const url = `/cbb/consulting/reservation/`;
    // fetch API를 사용하여 POST 요청 보내기
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: reservationId,
        scheduleId: scheduleId,
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
          alert("수락되었습니다.");
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
          fetchData();
        }}
      >
        수락
      </CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>상담 신청 처리</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                <CTableHeaderCell scope="col">학생</CTableHeaderCell>
                <CTableHeaderCell scope="col">상담일</CTableHeaderCell>
                <CTableHeaderCell scope="col">시간</CTableHeaderCell>
                <CTableHeaderCell scope="col">신청일</CTableHeaderCell>
                <CTableHeaderCell scope="col">수락</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.student}</CTableDataCell>
                  <CTableDataCell>
                    {item.consultationDate.slice(0, 10)}
                  </CTableDataCell>
                  <CTableDataCell>{item.consultationTime}</CTableDataCell>
                  <CTableDataCell>
                    {item.creationDate.slice(0, 10)}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      onClick={() => handleSubmit(item.reservationId)}
                    >
                      수락
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            닫기
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VerticallyCentered;
