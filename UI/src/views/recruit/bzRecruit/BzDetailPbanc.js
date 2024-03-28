
import {
    CContainer,
    CRow,
    CCol,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/detailPbanc.css';

const DetailPbanc = () => {
    const { pbancSn } = useParams();
    const [pbancData, setPbancData] = useState(null);
    const [comInfoData, setComInfoData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [aplyStts, setAplyStts] = useState(null);
    const [tngNo, setTngNo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedTngNo = sessionStorage.getItem("selectedTngNo");
        const userGroupCd = localStorage.getItem('userGroupCd');
        setTngNo(selectedTngNo);
        if (userGroupCd !== '50') {
            localStorage.clear()
            alert('로그인후 이용가능합니다.')
            navigate('/login');
        }

    }, []);

    useEffect(() => {
        fetchDataFromDatabase();
    }, [pbancSn]);

    useEffect(() => {
        if (pbancData && pbancData.bizRegNum) {
            fetchComInfo();
        }
    }, [pbancData]);


    const fetchDataFromDatabase = async () => {
        try {
            const response = await fetch(`/cbb/rcr/detail/${pbancSn}`);
            const jsonData = await response.json();
            setPbancData(jsonData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchComInfo = async () => {
        try {
            const response = await fetch('/cbb/rcr/detailCom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bizRegNum: pbancData.bizRegNum }),
            });
            const data = await response.json();
            setComInfoData(data);
        } catch (error) {
            console.log('Error fetching ComInfoData:', error);
        }
    };


    const fetchDeletePbanc = async () => {
        try {
            const response = await fetch('/cbb/rcr/bzRecruit/deletePbanc', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pbancSn: pbancData.pbancSn,
                })
            })
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.log('Error fetching checkAply', error)
        }

    };



    const formatDate = (dateNumber) => {
        const dateString = dateNumber.toString();
        const year = dateString.slice(0, 4);
        const month = parseInt(dateString.slice(4, 6), 10);
        const day = parseInt(dateString.slice(6, 8), 10);
        return `${year}. ${month}. ${day}.`;
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleYes = async () => {
        fetchDeletePbanc();
        setModalOpen(false);
        navigate(`/recruit/bzRecruit/BzNotAPRVPbanc/`);
    };

    const handleNo = () => {
        setModalOpen(false);
    };

    if (!pbancData || !comInfoData) {
        return <div>Loading...</div>;
    }

    return (

        <CContainer className="container">
            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">공고번호 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{pbancData.pbancSn}</div>
                </CCol>
                <CCol md={6}>
                </CCol>
            </CRow>
            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">공 고 명 :</div>
                </CCol>
                <CCol md={9}>
                    <div className="p-3 itmR">{pbancData.pbancName}</div>
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">채용인원 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{pbancData.numRcr}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">연   봉 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{pbancData.slry}</div>
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">공고게시일 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{new Date(pbancData.startDT).toLocaleDateString()}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">공고마감일 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{formatDate(pbancData.endYMD)}</div>
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">고용형태 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{pbancData.epmType}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">지원상태 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{pbancData.rcrStatus}</div>
                </CCol>
            </CRow>

            <CRow> <div className="itmC" style={{ width: '150px', margin: '5px 0px 0px 15px', fontSize: '1.2rem' }}>사업자정보</div></CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">사업자등록번호:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{pbancData.bizRegNum}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">기업명:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{comInfoData.BZENTYNM}</div>
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">대표명:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{comInfoData.BZENTYRPRSVNM}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">기업형태:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{comInfoData.ENTKND}</div>
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">소재지:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{comInfoData.LCNTADDR}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">자본금:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{(comInfoData.CPTL).toLocaleString()}</div>
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">연간매출액:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{(comInfoData.ANLSLSAMT).toLocaleString()}</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">근로자수:</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{comInfoData.TNOWK}</div>
                </CCol>
            </CRow>


            <CCol>
                <div className="p-3 itm">공고상세내용 :</div>
            </CCol>
            <CCol>
                <div className="p-3 itmC">{pbancData.pbancContent}</div>
            </CCol>



            <div style={{ justifyContent: "flex-end", display: "flex" }}>

                <CButton color="success" variant="outline" >수정하기</CButton>
                <CButton color="danger" variant="outline" onClick={toggleModal}>삭제하기</CButton>


            </div>
            <CModal alignment="center" visible={modalOpen} onClose={() => setModalOpen(false)}>
                <CModalHeader>삭제하시겠습니까?</CModalHeader>
                <CModalBody>
                    삭제시 복구 불가능합니다.<br />
                    해당 공고에 지원한 학생들의 기록 역시 삭제됩니다<br />

                    그래도 삭제하시겠습니까?
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleYes}>예</CButton>
                    <CButton color="secondary" onClick={handleNo}>아니요</CButton>
                </CModalFooter>
            </CModal>








        </CContainer>
    );
};

export default DetailPbanc;