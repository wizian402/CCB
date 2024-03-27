
import {
    CContainer,
    CRow,
    CCol,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CFormInput,
    CFormSelect,

} from '@coreui/react';

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/detailPbanc.css';
import ReactDatePicker from 'react-datepicker';

const writePbanc = () => {
    const [wPbancData, setWPbancData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [tngNo, setTngNo] = useState(null);
    const [modalContent, setModalContent] = useState(null);


    const [formData, setFormData] = useState({
        brno: '',
        title: '',
        empNum: '',
        slry: '',
        startDate: '',
        endDate: '',
        empType: '',
        pbancCT: '',



    });

    const [inputValue, setInputValue] = useState('');

    const [inputDisabled, setInputDisabled] = useState(true);
    const handleButtonClick = () => {
        setInputDisabled(!inputDisabled);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());




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
        fetchComInfo();

    }, []
    );

    useEffect(() => {
        if (wPbancData && wPbancData.BRNO) {
            setFormData(prevState => ({
                ...prevState,
                brno: wPbancData.BRNO
            }));
        }
    }, [wPbancData]);






    const fetchComInfo = async () => {
        try {
            const response = await fetch('/cbb/rcr/bzRecruit/getComInfo', {
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
            setWPbancData(jsonData);



        } catch (error) {
            console.log(error)
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
        console.log(formData)
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            // Handle response
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        setModalOpen(false);
    };

    const handleNo = () => {
        setModalOpen(false);
    };

    if (!wPbancData) {
        return <div>Loading...</div>;
    }

    return (
        <CContainer className="container">

            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={4}>
                    <div className="p-3 itmC"><h3>채용정보등록</h3></div>
                </CCol>
                <CCol md={2}>

                </CCol>
                <CCol md={6}>
                </CCol>
            </CRow>

            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">공 고 명 :</div>
                </CCol>
                <CCol md={9}>
                    <CFormInput className="p-3 input" id="tt" placeholder="제목을 입력하세요" type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">채용인원 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="empNum" placeholder="채용인원 수(0~)" type="text" value={formData.empNum} onChange={(e) => setFormData({ ...formData, empNum: e.target.value })} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">연   봉 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="slry" placeholder="연봉 (단위:만원)" type="text" value={formData.slry} onChange={(e) => setFormData({ ...formData, slry: e.target.value })} />                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">공고게시일 :</div>
                </CCol>
                <CCol md={3}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        StartDate={startDate}
                        endDate={endDate}
                    />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">공고마감일 :</div>
                </CCol>
                <CCol md={3}>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        StartDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">고용형태 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormSelect style={{ marginTop: '10px' }}
                        value={formData.empType}
                        onChange={(e) => setFormData({ ...formData, empType: e.target.value })}
                        options={[
                            { label: '근무유형 선택', disabled: true },
                            { label: '정규직', value: '3' },
                            { label: '계약직', value: '2' },
                            { label: '인턴', value: '1' },
                        ]}
                    />
                </CCol>
                <CCol md={3}>
                </CCol>
                <CCol md={3}>
                </CCol>
            </CRow>

            <CRow> <div className="itmC" style={{ width: '150px', margin: '5px 0px 0px 15px', fontSize: '1.2rem' }}>사업자정보</div></CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">사업자등록번호:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='brno' type="text" defaultValue={wPbancData.BRNO} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">기업명:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='bzNm' type="text" defaultValue={wPbancData.BZENTYNM} disabled={inputDisabled} />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">대표명:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='ceoNm' type="text" defaultValue={wPbancData.BZENTYRPRSVNM} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">기업형태:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='bzSize' type="text" defaultValue={wPbancData.ENTKND} disabled={inputDisabled} />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">소재지:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='loc' type="text" defaultValue={wPbancData.LCNTADDR} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">자본금:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='cpt' type="text" defaultValue={wPbancData.CPTL} disabled={inputDisabled} />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">연간매출액:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='asa' type="text" defaultValue={wPbancData.ANLSLSAMT} disabled={inputDisabled} />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">근로자수:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id='empNum' type="text" defaultValue={wPbancData.TNOWK} disabled={inputDisabled} />
                </CCol>
            </CRow>


            <CCol>
                <div className="p-3 itm">공고상세내용 :</div>
            </CCol>
            <CCol>
                <CFormInput style={{ height: '800px' }} placeholder='상세내역' className="p-3 itmD" type="text" value={formData.pbancCT} onChange={(e) => setFormData({ ...formData, pbancCT: e.target.value })} />
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
                    <CButton color="primary" variant="outline" onClick={handleYes}>예</CButton>
                    <CButton color="secondary" variant="outline" onClick={handleNo}>아니요</CButton>
                </CModalFooter>
            </CModal>

        </CContainer>
    );
};

export default writePbanc;