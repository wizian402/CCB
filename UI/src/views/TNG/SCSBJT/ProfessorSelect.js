import React, { useState, useEffect } from 'react';
import {
  CButton,
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem 
} from '@coreui/react';

const ProfessorSelect = () => {
  const [studentData, setStudentData] = useState([]);
  const [acavsrData, setAcavsrData] = useState([]);
  const [loginId, setLoginId] = useState(localStorage.getItem('loginId'));
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    fetchData('/cbb/scsbjt', setStudentData);
    fetchData('/cbb/selectAcavsr', setAcavsrData);
  }, []);

  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId }),
      });
      const data = await response.json();
      setter(data);
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModalOpen = (student) => {
    setSelectedStudent(student);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
  };

  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleSaveChanges = () => {

      const stdntSn = selectedStudent.stdntSn;
      const acavsrNo = selectedProfessor.acavsrNo;

      fetch('/cbb/saveAcavsr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({stdntSn, acavsrNo }),
      })
      .then(response => response.json())
      .then(data => {

      })
      .catch(error => {

      });

  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>지도교수 배정</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">학생명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">학번</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">지도교수</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {studentData.map((student, index) => (
                  <CTableRow key={index} className="align-middle">
                    <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                    <CTableDataCell className="text-center">{student.stdntNm}</CTableDataCell>
                    <CTableDataCell className="text-center">{student.stdntSn}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {student.acavsrNo === null && (
                        <CButton onClick={() => handleModalOpen(student)}>지도교수 배정</CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal alignment="center" visible={selectedStudent !== null} onClose={handleModalClose}>
        <CModalHeader>
          <CModalTitle>지도교수 배정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedStudent && (
            <>
              <p>{selectedStudent.stdntNm}</p>
              <p>{selectedStudent.stdntSn}</p>
            </>
          )}
          <CDropdown>
            <CDropdownToggle color="secondary">{selectedProfessor ? selectedProfessor.acavsrNm : '지도교수 선택'}</CDropdownToggle>
            <CDropdownMenu>
              {acavsrData.map((professor, index) => (
                <CDropdownItem key={index} onClick={() => handleProfessorSelect(professor)}>
                  {professor.acavsrNm}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleModalClose}>Close</CButton>
          <CButton color="primary" onClick={handleSaveChanges}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ProfessorSelect;
