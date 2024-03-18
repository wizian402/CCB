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
  CPagination,
  CPaginationItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react';

const StdntAply = () => {

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
                  <CTableHeaderCell scope="col" style={{ width: '12%' }} className="text-center">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">산업체명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">담당 업무명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">실습 인원수</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '22%' }} className="text-center">진행 상태</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default StdntAply;
