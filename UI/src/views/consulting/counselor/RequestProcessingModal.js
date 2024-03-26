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
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="primary" onClick={handleSubmit}> */}
          {/* 신청 */}
          {/* </CButton> */}
          <CButton color="secondary" onClick={() => setVisible(false)}>
            닫기
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VerticallyCentered;
