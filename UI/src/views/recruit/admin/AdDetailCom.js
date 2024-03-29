
import {
    CContainer,
    CRow,
    CCol,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CSpinner,
    CForm,
    CFormInput,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/detailPbanc.css';

const detailCom = () => {
    const { brno } = useParams();
    const [managerInfo, setManagerInfo] = useState(null);
    const [comInfoData, setComInfoData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [aplyStts, setAplyStts] = useState(null);
    const [tngNo, setTngNo] = useState(null);
    const navigate = useNavigate();
    const [inputDisabled, setInputDisabled] = useState(true);
    const handleButtonClick = () => {
        setInputDisabled(!inputDisabled);
    };


    const [comFormData, setComFormData] = useState({
        name: '',
        regNo: '',
        repName: '',
        annualSales: '',
        type: '',
        estYear: '',
        annualOutput: '',
        capital: '',
        address: '',
        empCount: '',
        businessType: '',
        lastModified: new Date()
    });

    const [managerFormData, setManagerFormData] = useState({
        name: '',
        position: '',
        email: '',
        phoneNumber: ''
    });


    useEffect(() => {
        const selectedTngNo = sessionStorage.getItem("selectedTngNo");
        const userGroupCd = localStorage.getItem('userGroupCd');
        setTngNo(selectedTngNo);
        if (userGroupCd !== '10') {
            localStorage.clear()
            alert('로그인후 이용가능합니다.')
            navigate('/login');
        }
        fetchDataFromDatabase();
        fetchManagerInfo();



    }, []);


    const fetchDataFromDatabase = async () => {

        try {
            const response = await fetch('/cbb/rcr/admin/detailCom',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ brno: { brno }.brno }),
                });
            const data = await response.json();
            console.log(data)
            setComInfoData(data);

            if (data) {
                setComFormData((prevData) => ({
                    ...prevData,
                    name: data.BZENTY_NM,
                    regNo: data.BRNO,
                    repName: data.BZENTY_RPRSV_NM,
                    annualSales: data.ANL_SLS_AMT,
                    type: data.ENT_KND,
                    estYear: data.FNDN_YR,
                    annualOutput: data.ANLSL_AMT,
                    capital: data.CPTL,
                    address: data.LCNT_ADDR,
                    empCount: data.TNOWK,
                    businessType: data.TPBIZ_NM,
                }));
            }
        } catch (error) {
            console.log('Error fetching ComInfoData:', error);
        }
    };

    const fetchManagerInfo = async () => {
        try {
            const response = await fetch('/cbb/rcr/admin/manager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ brno: { brno }.brno }),
            });
            const data = await response.json();
            console.log(data)
            setManagerInfo(data);
            if (data) {
                setManagerFormData((prevData) => ({
                    ...prevData,
                    name: data.BZENTY_PIC_NM,
                    position: data.BZENTY_PIC_JBPS_NM,
                    email: data.BZENTY_PIC_EML_ADDR,
                    phoneNumber: data.BZENTY_PIC_TELNO,
                }));
            }
        } catch (error) {
            console.log('Error fetching ComInfoData:', error);
        }
    };


    const updateComAndMng = async () => {
        try {
            const response = await fetch('/cbb/rcr/admin/manager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ brno: { brno }.brno }),
            });
            const data = await response.json();
            console.log(data)
            setManagerInfo(data);
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

                })
            })
            const jsonData = await response.json();
            console.log(jsonData)
        } catch (error) {
            console.log('Error fetching checkAply', error)
        }

    };


    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const updateBtn = () => {
        console.log("매니저폼데이터" + managerFormData)
        console.log("컴데이터" + comFormData)
    }



    const handleYes = async () => {
        fetchDeletePbanc();
        setModalOpen(false);
        navigate(`/recruit/bzRecruit/BzNotAPRVPbanc/`);
    };

    const handleNo = () => {
        setModalOpen(false);
    };

    if (!comInfoData || !managerInfo) {
        return <><CSpinner color="primary" /><div>Loading...</div></>;
    }

    return (

        <CContainer className="container">
            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">기업명 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="name" type="text" value={comFormData.name} onChange={(e) => setComFormData({ ...comFormData, name: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={6}>
                </CCol>

            </CRow>
            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">사업자등록번호 :</div>
                </CCol>
                <CCol md={9}>
                    <CFormInput className="p-3 input" id="regNo" type="text" value={comFormData.regNo} onChange={(e) => setComFormData({ ...comFormData, regNo: e.target.value })} disabled={inputDisabled} required />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">대표명 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="repName" type="text" value={comFormData.repName} onChange={(e) => setComFormData({ ...comFormData, repName: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">연   봉 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="annualSales" type="text" value={comFormData.annualSales} onChange={(e) => setComFormData({ ...comFormData, annualSales: e.target.value })} disabled={inputDisabled} required />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">기업구분 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="type" type="text" value={comFormData.type} onChange={(e) => setComFormData({ ...comFormData, type: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">설립연도 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="estYear" type="text" value={comFormData.estYear} onChange={(e) => setComFormData({ ...comFormData, estYear: e.target.value })} disabled={inputDisabled} required />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">매 출 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="annualOutput" type="text" value={comFormData.annualOutput} onChange={(e) => setComFormData({ ...comFormData, annualOutput: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">자본금 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="capital" type="text" value={comFormData.capital} onChange={(e) => setComFormData({ ...comFormData, capital: e.target.value })} disabled={inputDisabled} required />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">주 소:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="address" type="text" value={comFormData.address} onChange={(e) => setComFormData({ ...comFormData, address: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">종업원수 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="empCount" type="text" value={comFormData.empCount} onChange={(e) => setComFormData({ ...comFormData, empCount: e.target.value })} disabled={inputDisabled} required />
                </CCol>
            </CRow>
            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">업종분류 :</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="businessType" type="text" value={comFormData.businessType} onChange={(e) => setComFormData({ ...comFormData, businessType: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">마지막수정일 :</div>
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmR">{new Date(comInfoData.LAST_REG_DT).toLocaleDateString()}</div>
                </CCol>
            </CRow>



            <CRow> <div className="itmC" style={{ width: '150px', margin: '5px 0px 0px 15px', fontSize: '1.2rem' }}>담당자 정보</div></CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">이름:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="name" type="text" value={managerFormData.name} onChange={(e) => setManagerFormData({ ...managerFormData, name: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">직급:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="position" type="text" value={managerFormData.position} onChange={(e) => setManagerFormData({ ...managerFormData, position: e.target.value })} disabled={inputDisabled} required />
                </CCol>
            </CRow>

            <CRow md={{ cols: 4, gutter: 1 }}>
                <CCol md={3}>
                    <div className="p-3 itmL">이메일:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="email" type="text" value={managerFormData.email} onChange={(e) => setManagerFormData({ ...managerFormData, email: e.target.value })} disabled={inputDisabled} required />
                </CCol>
                <CCol md={3}>
                    <div className="p-3 itmL">전화번호:</div>
                </CCol>
                <CCol md={3}>
                    <CFormInput className="p-3 input" id="phoneNumber" type="text" value={managerFormData.phoneNumber} onChange={(e) => setManagerFormData({ ...managerFormData, phoneNumber: e.target.value })} disabled={inputDisabled} required />

                </CCol>
            </CRow>



            <div style={{ justifyContent: "flex-end", display: "flex" }}>
                <CRow>
                    <div>
                        <CButton color="info" onClick={handleButtonClick}>
                            {inputDisabled ? '수정하기' : '수정완료'}
                        </CButton>
                    </div>
                </CRow>
                <CButton color="success" variant="outline" onClick={updateBtn} >갱신하기</CButton>
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






        </CContainer >
    );

};

export default detailCom;