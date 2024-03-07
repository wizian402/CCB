/*

import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'


const Tables = () => {
  return (
    <CRow>
     
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
          
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>

          
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
*/



/*
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';

const Tables = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchDataFromDatabase()
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch('/cbb/rcr/list');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.Error('Failed to fetch data from server:', error);
    }
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setShowDetailModal(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Recruiter Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Salary</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Approval</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Business Reg. Num</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item, index) => (
                  <CTableRow key={item.pbancSn}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.pbancName}</CTableDataCell>
                    <CTableDataCell>{item.numRcr}</CTableDataCell>
                    <CTableDataCell>{item.slry}</CTableDataCell>
                    <CTableDataCell>{item.pbancContent}</CTableDataCell>
                    <CTableDataCell>{item.endYMD}</CTableDataCell>
                    <CTableDataCell>{item.aprvYN}</CTableDataCell>
                    <CTableDataCell>{item.startDT}</CTableDataCell>
                    <CTableDataCell>{item.epmType}</CTableDataCell>
                    <CTableDataCell>{item.rcrStatus}</CTableDataCell>
                    <CTableDataCell>{item.bizRegNum}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal show={showDetailModal} onClose={() => setShowDetailModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Detail Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedRowData && (
            <div>
              <p>Company Name: {selectedRowData.pbancName}</p>
              <p>Recruiter Number: {selectedRowData.numRcr}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>


    </CRow>
  );
};

export default Tables;

*/
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch('/cbb/rcr/list');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    console.log(item)
    console.log("modalOpen state:", modalOpen);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleDetailButtonClick = () => {
    if (selectedItem) {
      navigate(`/detail/${selectedItem.pbancSn}`);
      handleCloseModal();
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Recruiter Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Salary</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Approval</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Business Reg. Num</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item, index) => (
                  <CTableRow key={item.pbancSn} onClick={() => handleRowClick(item)}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.pbancName}</CTableDataCell>
                    <CTableDataCell>{item.numRcr}</CTableDataCell>
                    <CTableDataCell>{item.slry}</CTableDataCell>
                    <CTableDataCell>{item.pbancContent}</CTableDataCell>
                    <CTableDataCell>{item.endYMD}</CTableDataCell>
                    <CTableDataCell>{item.aprvYN}</CTableDataCell>
                    <CTableDataCell>{item.startDT}</CTableDataCell>
                    <CTableDataCell>{item.epmType}</CTableDataCell>
                    <CTableDataCell>{item.rcrStatus}</CTableDataCell>
                    <CTableDataCell>{item.bizRegNum}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal
        show={modalOpen}
        onClose={handleCloseModal}
      >
        <CModalHeader closeButton>
          <CModalTitle>Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedItem && (
            <div>
              <p>Company Name: {selectedItem.pbancName}</p>
              <p>Recruiter Number: {selectedItem.numRcr}</p>
              <p>Salary: {selectedItem.slry}</p>
              <p>Description: {selectedItem.pbancContent}</p>
              <p>End Date: {selectedItem.endYMD}</p>
              <p>Approval: {selectedItem.aprvYN}</p>
              <p>Start Date: {selectedItem.startDT}</p>
              <p>Type: {selectedItem.epmType}</p>
              <p>Status: {selectedItem.rcrStatus}</p>
              <p>Business Reg. Num: {selectedItem.bizRegNum}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>Close</CButton>
          <CButton color="primary" onClick={handleDetailButtonClick}>View Details</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default Tables;
