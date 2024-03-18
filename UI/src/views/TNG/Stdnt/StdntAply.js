import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const StdntAply = () => {
  const navigate = useNavigate();
  const [tngList, setTngList] = useState([]);

  useEffect(() => {
    const userGroupCd = localStorage.getItem('userGroupCd');
    if (userGroupCd !== '20') {
      localStorage.clear();
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      fetchTngList();
    }
  }, []);

  const fetchTngList = () => {
    fetch('/cbb/tng/stdntAly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setTngList(data))
      .catch(error => console.error('Error fetching training list:', error));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>학생</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ width: '10%' }} className="text-center">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '18%' }} className="text-center">산업체명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '18%' }} className="text-center">담당 업무명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '18%' }} className="text-center">현장실습 시작일</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '18%' }} className="text-center">현장실습 종료일</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '18%' }} className="text-center">신청마감일</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tngList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.industry}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.tkcgTaskNm}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.tngStYMD}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.tngEndYMD}</CTableDataCell>
                    <CTableDataCell className="text-center">{item.aplyEndDt}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default StdntAply;
