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
    CButton,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SerchBox';
import Pagination from './components/Pagination';

const Tables = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5; // 페이지당 보여줄 아이템 수


    useEffect(() => {
        fetchResumeList();
    }, [])


    useEffect(() => {
        filterData();
    }, [data, searchTerm]);


    const fetchResumeList = async () => {
        try {
            const response = await fetch('/cbb/rcr/resumeList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userNo: localStorage.getItem('userNo'), }),
            });
            const data = await response.json();
            console.log(data)
            setData(data);
        } catch (error) {
            console.log('Error fetching ComInfoData:', error);
        }
    };



    const filterData = () => {
        const filtered = data.filter(item => {
            return item.RSM_NM.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredData(filtered);
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setVisible(!visible);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setVisible(false);
    };

    const handleDetailButtonClick = () => {
        if (selectedItem) {
            navigate(`/recruit/detailPbanc/${selectedItem.pbancSn}`);
            handleCloseModal();
        }
    };

    const handleDelete = async (number) => {
        console.log("RSM_SN" +
            number)
        try {
            const response = await fetch('/cbb/rcr/resumeDelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number }),
            });
            if (response.ok) {
                console.log("삭제성공");
            }


        } catch (error) {
            console.log('Error fetching ComInfoData:', error);
        }
        fetchResumeList();
    };

    const formatDate = (dateNumber) => {
        const dateString = dateNumber.toString();
        const year = dateString.slice(0, 4);
        const month = parseInt(dateString.slice(4, 6), 10);
        const day = parseInt(dateString.slice(6, 8), 10);
        return `${year}. ${month}. ${day}.`;
    };

    // 현재 페이지의 데이터를 가져오는 함수
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, endIndex);
    };

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const handleSearchButtonClick = () => {
        filterData();
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong><h2>내 이력서 관리</h2></strong> <small></small>
                    </CCardHeader>
                    <CCardBody>

                        {/* <CInputGroup className="mb-3">
              <CFormInput
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', height: '40px' }}
              />
            </CInputGroup> */}

                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleSearchButtonClick={handleSearchButtonClick}
                        />

                        <CTable hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">순번</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">이력서 제목</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">이력서 작성일</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">삭제</CTableHeaderCell>

                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {getCurrentPageData().map((item, index) => (
                                    <CTableRow key={item.RSM_SN} onClick={() => handleRowClick(item)}>
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{item.RSM_NM}</CTableDataCell>
                                        <CTableDataCell>{item.MK_DATE}</CTableDataCell>
                                        <CTableDataCell> {/* 삭제 버튼이 추가된 셀 */}
                                            <CButton onClick={(e) => { e.stopPropagation(); handleDelete(item.RSM_SN); }}>삭제</CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* 페이지네이션 */}
            <CCol xs={12}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </CCol>

            <CModal visible={visible} onClose={handleCloseModal}>
                <CModalHeader closeButton>
                    <CModalTitle>요약정보</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedItem && (
                        <div>
                            {/* <p>공고명: {selectedItem.pbancName}</p> */}
                            {/* <p>모집인원: {selectedItem.numRcr}</p> */}
                            {/* <p>연봉: {selectedItem.slry}</p> */}
                            {/* <p>상세내용: {selectedItem.pbancContent}</p> */}
                            {/* <p>공고게시일: {new Date(selectedItem.startDT).toLocaleDateString()}</p> */}
                            {/* <p>공고마감일: {formatDate(selectedItem.endYMD)}</p> */}
                            {/* <p>Approval: {selectedItem.aprvYN}</p> */}
                            {/* <p>Type: {selectedItem.epmType}</p> */}
                            {/* <p>Status: {selectedItem.rcrStatus}</p> */}
                            {/* <p>Business Reg. Num: {selectedItem.bizRegNum}</p> */}
                        </div>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" variant="outline" onClick={handleDetailButtonClick}>
                        상세보기
                    </CButton>
                    <CButton color="secondary" variant="outline" onClick={handleCloseModal}>
                        닫기
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    );
};

export default Tables;
