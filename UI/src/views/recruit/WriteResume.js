
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
    CForm,

} from '@coreui/react';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './scss/detailPbanc.css';

const writeResume = () => {
    const [stdntData, setStdntData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [tngNo, setTngNo] = useState(null);
    const [modalContent, setModalContent] = useState(null);


    const [formData, setFormData] = useState({
        stdntsn: '',
        title: '',
        schoolName: '',
        graduationDate: '',
        graduationStatus: '',
        certificate: '',
        issuer: '',
        certificationDate: '',
        experience: '',
        socialNote1: '',
        socialNote2: '',
        languageType: '',
        languageGrade: '',
        languageAcquisitionDate: '',
        motivation: '',
        failureExperience: '',
        futurePlan: ''
    });

    const [inputValue, setInputValue] = useState('');

    const [inputDisabled, setInputDisabled] = useState(true);
    const handleButtonClick = () => {
        setInputDisabled(!inputDisabled);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

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


    useEffect(() => {
        fetchStdntInfo();
    }, []
    );

    useEffect(() => {
        if (stdntData) {
            setFormData({ ...formData, stdntsn: stdntData.STDNT_SN });
        }
    }, [stdntData]);


    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log(validated)
            toggleModal(); // 폼 유효성 검사를 통과한 경우 모달 열기
        }

        setValidated(true);
    };


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
        console.log(formData)
        try {
            const response = await fetch('/cbb/rcr/writeResume', {
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
        window.location.reload();
    };

    const handleNo = () => {
        setModalOpen(false);
    };

    if (!stdntData) {
        return <div>Loading...</div>;
    }

    return (
        <CContainer className="container">
            <CForm
                className="needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
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
                        <CFormInput className="p-3 input" id='ttIn' placeholder="제목을 입력하세요" type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </CCol>
                </CRow>

                <CRow md={{ cols: 4, gutter: 1 }}>
                    <CCol md={3}>
                        <div className="p-3 itmL">이 름 :</div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='nmIn' type="text" defaultValue={stdntData.STDNT_NM} disabled={inputDisabled} required />
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 itmL">전 공 : </div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='scsbjtIn' type="text" defaultValue={stdntData.SCSBJT_CD} disabled={inputDisabled} required />
                    </CCol>
                </CRow>
                <CRow md={{ cols: 4, gutter: 1 }}>
                    <CCol md={3}>
                        <div className="p-3 itmL">학번 : </div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='snIn' type="text" defaultValue={stdntData.STDNT_SN} disabled={inputDisabled} required />
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 itmL">학년 : </div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='grdIn' type="text" defaultValue={stdntData.STDNT_GRD} disabled={inputDisabled} required />
                    </CCol>
                </CRow>
                <CRow md={{ cols: 4, gutter: 1 }}>
                    <CCol md={3}>
                        <div className="p-3 itmL">연락처 :</div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_TELNO} disabled={inputDisabled} required />
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 itmL">이메일 :</div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_EML_ADDR} disabled={inputDisabled} required />
                    </CCol>
                </CRow>
                <CRow md={{ cols: 4, gutter: 1 }}>
                    <CCol md={3}>
                        <div className="p-3 itmL">주소 : </div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_ADDR} disabled={inputDisabled} required />
                    </CCol>
                    <CCol md={3}>
                        <div className="p-3 itmL">생년월일 :</div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput className="p-3 input" id='telIn' type="text" defaultValue={stdntData.STDNT_BRDT} disabled={inputDisabled} required />
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
                        <CFormInput placeholder='학교명' className="p-3 itmD" type="text" value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='졸업연월' className="p-3 itmD" type="text" value={formData.graduationDate} onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormSelect style={{ marginTop: '10px' }}
                            value={formData.graduationStatus}
                            onChange={(e) => setFormData({ ...formData, graduationStatus: e.target.value })}
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
                        <CFormInput placeholder='자격증' className="p-3 itmD" type="text" value={formData.certificate} onChange={(e) => setFormData({ ...formData, certificate: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='발급처' className="p-3 itmD" type="text" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='자격증 취득일시' className="p-3 itmD" type="text" value={formData.certificationDate} onChange={(e) => setFormData({ ...formData, certificationDate: e.target.value })} required />
                    </CCol>
                </CRow>

                <CRow md={{ cols: 4, gutter: 1 }}>
                    <CCol md={3}>
                        <div className="p-3 itmL">사회경험 : </div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='경험' className="p-3 itmD" type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='비고1' className="p-3 itmD" type="text" value={formData.socialNote1} onChange={(e) => setFormData({ ...formData, socialNote1: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='비고2' className="p-3 itmD" type="text" value={formData.socialNote2} onChange={(e) => setFormData({ ...formData, socialNote2: e.target.value })} required />
                    </CCol>
                </CRow>

                <CRow md={{ cols: 4, gutter: 1 }}>
                    <CCol md={3}>
                        <div className="p-3 itmL">어학능력 : </div>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='어학종류' className="p-3 itmD" type="text" value={formData.languageType} onChange={(e) => setFormData({ ...formData, languageType: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='등급' className="p-3 itmD" type="text" value={formData.languageGrade} onChange={(e) => setFormData({ ...formData, languageGrade: e.target.value })} required />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput placeholder='취득일시' className="p-3 itmD" type="text" value={formData.languageAcquisitionDate} onChange={(e) => setFormData({ ...formData, languageAcquisitionDate: e.target.value })} required />
                    </CCol>
                </CRow>


                <CCol>
                    <div className="p-3 itm">지원동기 :</div>
                </CCol>
                <CCol>
                    <CFormInput style={{ height: '800px' }} placeholder='지원동기' className="p-3 itmD" type="text" value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} required />
                </CCol>

                <CCol>
                    <div className="p-3 itm">실패경험 :</div>
                </CCol>
                <CCol>
                    <CFormInput style={{ height: '800px' }} placeholder='실패경험' className="p-3 itmD" type="text" value={formData.failureExperience} onChange={(e) => setFormData({ ...formData, failureExperience: e.target.value })} required />
                </CCol>

                <CCol>
                    <div className="p-3 itm">입사후계획 :</div>
                </CCol>
                <CCol>
                    <CFormInput style={{ height: '800px' }} placeholder='입사후계획' className="p-3 itmD" type="text" value={formData.futurePlan} onChange={(e) => setFormData({ ...formData, futurePlan: e.target.value })} required />
                </CCol>

                <div style={{ justifyContent: "flex-end", display: "flex" }}>
                    <CButton type="submit" color="danger" variant="outline">작성완료하기</CButton>
                </div>
            </CForm>



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

export default writeResume;