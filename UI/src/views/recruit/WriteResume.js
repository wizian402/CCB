
import {
    CContainer,
    CRow,
    CCol,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormSelect,

} from '@coreui/react';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './scss/detailPbanc.css';

const DetailPbanc = () => {
    const [stdntData, setStdntData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [tngNo, setTngNo] = useState(null);
    const [chgButton, setChgButton] = useState(null);
    const [modalContent, setModalContent] = useState(null);


    const [inputValue, setInputValue] = useState('');

    const [inputDisabled, setInputDisabled] = useState(true);
    const handleButtonClick = () => {
        setInputDisabled(!inputDisabled);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };



    useEffect(() => {
        fetchStdntInfo();
    }, []
    );



    useEffect(() => {
        const selectedTngNo = sessionStorage.getItem("selectedTngNo");
        const userGroupCd = localStorage.getItem('userGroupCd');
        setTngNo(selectedTngNo);
        if (userGroupCd !== '20') {
            localStorage.clear()
            alert('로그인후 이용가능합니다.')
            navigate('/login');
        }
    }, []);



    const fetchStdntInfo = async () => {
        try {
            const response = await fetch('/cbb/rcr/fetchStdntInfo', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userNo: localStorage.getItem('userNo'),
                })

            })
            const jsonData = await response.json();
            console.log(jsonData);
            setStdntData(jsonData)
        } catch (error) {
            console.log('Error fetching checkAply', error)
        }
    }





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
        await fetchUdtJobSearch();
        await fetchCheckAply();
        setModalOpen(false);
    };

    const handleNo = () => {
        setModalOpen(false);
    };

    const handleCancel = async () => {
        await fetchCancleAply();
        await fetchCheckAply();
        setModalOpen(false);
    }

    if (!stdntData) {
        return <div>Loading...</div>;
    }

    return (
        <CContainer className="container">

            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmC"><h3>이력서작성</h3></div>
                </CCol>
                <CCol md={3}>

                </CCol>
                <CCol md={6}>
                </CCol>
            </CRow>
            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">제 목 :</div>
                </CCol>
                <CCol md={9}>
                    <CFormInput type="text" className="p-3 input" id='ttIn' placeholder="제목을 입력하세요" />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">이 름 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='nmIn' type="text" defaultValue={stdntData.STDNT_NM} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">전 공 : </div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='scsbjtIn' type="text" defaultValue={stdntData.SCSBJT_CD} disabled={inputDisabled} />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">학번 : </div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='snIn' type="text" defaultValue={stdntData.STDNT_SN} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">학년 : </div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='grdIn' type="text" defaultValue={stdntData.STDNT_GRD} disabled={inputDisabled} />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">연락처 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_TELNO} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">이메일 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_EML_ADDR} disabled={inputDisabled} />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">주소 : </div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_ADDR} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">생년월일 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_BRDT} disabled={inputDisabled} />
                </CCol>
            </CRow>

            <CRow>
                <div>
                    <CButton color="info" onClick={handleButtonClick}>
                        {inputDisabled ? '수정하기' : '수정완료'}
                    </CButton>
                </div>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">학력사항:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='학교명' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='졸업연월' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormSelect style={{ marginTop: '10px' }}
                        options={[
                            { label: '졸업유무 선택', disabled: true },
                            { label: '졸업', value: '1' },
                            { label: '미졸업', value: '2' },
                        ]}
                    />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">보유자격증:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='자격증' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='발급처' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='자격증 취득일시' className="p-3 itmD" />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">사회경험 : </div>
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='경험' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='비고1' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='비고2' className="p-3 itmD" />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">어학능력 : </div>
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='어학종류' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='등급' className="p-3 itmD" />
                </CCol>
                <CCol md={3}>
                    <CFormInput placeholder='취득일시' className="p-3 itmD" />
                </CCol>
            </CRow>


            <CCol>
                <div className="p-3 itm">지원동기 :</div>
            </CCol>
            <CCol>
                <CFormInput style={{ height: '800px' }} placeholder='지원동기' className="p-3 itmD" />
            </CCol>

            <CCol>
                <div className="p-3 itm">실패경험 :</div>
            </CCol>
            <CCol>
                <CFormInput style={{ height: '800px' }} placeholder='실패경험' className="p-3 itmD" />
            </CCol>

            <CCol>
                <div className="p-3 itm">입사후계획 :</div>
            </CCol>
            <CCol>
                <CFormInput style={{ height: '800px' }} placeholder='입사후계획' className="p-3 itmD" />
            </CCol>

            <div style={{ justifyContent: "flex-end", display: "flex" }}>
                <CButton color="danger" variant="outline" onClick={toggleModal}>작성완료하기</CButton>
            </div>



            <CModal alignment="center" visible={modalOpen} onClose={() => setModalOpen(false)}>
                <CModalHeader></CModalHeader>
                <CModalBody>
                    이력서 작성을 완료하시겠습니까?
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" variant="outline">예</CButton>
                    <CButton color="secondary" variant="outline">아니요</CButton>
                </CModalFooter>
            </CModal>

        </CContainer>
    );
};

export default DetailPbanc;