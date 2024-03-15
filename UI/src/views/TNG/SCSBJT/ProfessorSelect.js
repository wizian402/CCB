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
  CDropdownItem,
  CFormInput,
  CPagination,
  CPaginationItem
} from '@coreui/react';
import SearchLabel from 'src/views/TNG/SCSBJT/component/SearchLabel';

const ModalContent = ({ selectedStudent, selectedProfessor, acavsrData, handleProfessorSelect, handleSaveChanges, handleModalClose }) => (
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
      <CButton color="primary" onClick={handleSaveChanges} disabled={!selectedProfessor || !selectedStudent}>지도교수 배정</CButton>
      <CButton color="secondary" onClick={handleModalClose}>취소</CButton>
    </CModalFooter>
  </CModal>
);

const ProfessorSelect = () => {
  const [studentData, setStudentData] = useState([]);
  const [acavsrData, setAcavsrData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
        body: JSON.stringify({ loginId: localStorage.getItem('loginId') }),
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
    setSelectedProfessor(null);
  };

  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleSaveChanges = async () => {
    if (selectedProfessor !== null && selectedStudent !== null) {
      const stdntSn = selectedStudent.stdntSn;
      const acavsrNo = selectedProfessor.acavsrNo;

      try {
        const response = await fetch('/cbb/saveAcavsr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stdntSn, acavsrNo }),
        });
        fetchData('/cbb/scsbjt', setStudentData);
        fetchData('/cbb/selectAcavsr', setAcavsrData);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('교수나 학생을 선택해주세요.');
    }
    setSelectedProfessor(null);
    setSelectedStudent(null);
  };

  // 필터된 데이터 가져오기
  const filteredData = studentData.filter((student) =>
    student.stdntNm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 현재 페이지의 데이터 가져오기
  const sortedData = filteredData.slice().sort((a, b) => {
    if (!a.acavsrNo && b.acavsrNo) {
      return -1; // a의 acavsrNo가 없는 경우, b를 앞으로 이동
    } else if (a.acavsrNo && !b.acavsrNo) {
      return 1; // b의 acavsrNo가 없는 경우, a를 앞으로 이동
    } else {
      return 0; // 두 항목의 acavsrNo가 같거나 둘 다 없는 경우, 순서 변경 없음
    }
  });
  const indexOfLastStudent = currentPage * 10;
  const indexOfFirstStudent = indexOfLastStudent - 10;
  const currentStudents = sortedData.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>지도교수 배정</strong>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              id="exampleFormControlInput1"
              placeholder="이름을 입력하세요"
              value={searchTerm}
              onChange={handleSearchTermChange}
              style={{ width: '300px' }}
            />
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ width: '10%' }} className="text-center">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '30%' }} className="text-center">학생명</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '30%' }} className="text-center">학번</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '30%' }} className="text-center">지도교수</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentStudents.map((student, index) => (
                  <CTableRow key={index} className="align-middle" style={{ height: '60px' }}>
                    <CTableHeaderCell className="text-center">{indexOfFirstStudent + index + 1}</CTableHeaderCell>
                    <CTableDataCell className="text-center">{student ? student.stdntNm : '-'}</CTableDataCell>
                    <CTableDataCell className="text-center">{student ? student.stdntSn : '-'}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {student && student.acavsrNo === null ? (
                        <CButton onClick={() => handleModalOpen(student)}>지도교수 배정</CButton>
                      ) : (
                        student ? acavsrData.find(acavsr => acavsr.acavsrNo === student.acavsrNo)?.acavsrNm || '' : '-'
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <CPagination className="justify-content-center" aria-label="Page navigation example">
              <CPaginationItem aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {Array.from({ length: Math.ceil(filteredData.length / 10) }, (_, index) => (
                <CPaginationItem
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)} // 페이지를 클릭할 때 현재 페이지 상태를 설정
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
      <ModalContent
        selectedStudent={selectedStudent}
        selectedProfessor={selectedProfessor}
        acavsrData={acavsrData}
        handleProfessorSelect={handleProfessorSelect}
        handleSaveChanges={handleSaveChanges}
        handleModalClose={handleModalClose}
      />
    </CRow>
  );
};

export default ProfessorSelect;
