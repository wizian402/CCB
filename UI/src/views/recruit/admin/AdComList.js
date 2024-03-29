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
import SearchBar from '../components/SerchBox';
import Pagination from '../components/Pagination';

const Tables = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5; // 페이지당 보여줄 아이템 수

    const [tngNo, setTngNo] = useState(null);
    useEffect(() => {
        const selectedTngNo = sessionStorage.getItem("selectedTngNo");
        const userGroupCd = localStorage.getItem('userGroupCd');
        setTngNo(selectedTngNo);
        if (userGroupCd !== '10') {
            localStorage.clear()
            alert('로그인후 이용가능합니다.')
            navigate('/login');
        }

    }, []);


    useEffect(() => {
        fetchDataFromDatabase();
    }, []);

    useEffect(() => {
        filterData();
    }, [data, searchTerm]);

    const fetchDataFromDatabase = async () => {
        try {
            const response = await fetch('/cbb/rcr/admin/allComList', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                })
            })
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.log('Error fetching checkAply', error)
        }

    };

    const filterData = () => {
        const filtered = data.filter(item => {
            return item.BZENTY_NM.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredData(filtered);
    };

    const handleRowClick = (selectedItem) => {
        
        navigate(`/recruit/admin/AdDetailCom/${selectedItem.BRNO}`);
        
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
                        <strong><h2>참여기업목록</h2></strong> <small></small>
                    </CCardHeader>
                    <CCardBody>

                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleSearchButtonClick={handleSearchButtonClick}
                        />

                        <CTable hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">순번</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">기업명</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">사업자등록번호</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">마지막수정일</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {getCurrentPageData().map((item, index) => (
                                    <CTableRow key={item.BRNO} onClick={() => handleRowClick(item)}>
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{item.BZENTY_NM}</CTableDataCell>
                                        <CTableDataCell>{item.BRNO}</CTableDataCell>
                                        <CTableDataCell>{new Date(item.LAST_REG_DT).toLocaleDateString()}</CTableDataCell>
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

        </CRow>
    );
};

export default Tables;
