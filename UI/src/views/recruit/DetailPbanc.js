
import {
    CContainer,
    CRow,
    CCol,

} from '@coreui/react';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './scss/detailPbanc.css';


export const test = () => {
    return <div> hi</div>
}

const DetailPbanc = () => {
    const { pbancSn } = useParams();
    const [pbancData, setPbancData] = useState(null);
    const [comInfoData, setComInfoData] = useState(null);

    useEffect(() => {
        fetchDataFromDatabase();
    }, [pbancSn]);

    const fetchDataFromDatabase = async () => {
        try {
            const response = await fetch(`/cbb/rcr/detail/${pbancSn}`); // Assuming this is the endpoint to fetch detail information based on pbancSn
            const jsonData = await response.json();
            setPbancData(jsonData);
            console.log(jsonData)
            const response2 = await fetch(`/cbb/rcr/detailCom/${pbancData.bizRegNum}`);
            const jsonData2 = await response2.json();
            setComInfoData(jsonData2);
            console.log(comInfoData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };





    const formatDate = (dateNumber) => {
        const dateString = dateNumber.toString();
        const year = dateString.slice(0, 4);
        const month = parseInt(dateString.slice(4, 6), 10);
        const day = parseInt(dateString.slice(6, 8), 10);
        return `${year}. ${month}. ${day}.`;
    };



    if (!pbancData) {
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

            <CRow md={{ cols: 2, gutter: 1 }}>
                <CCol md={4}>
                    <div className="p-3 itmL">사업자등록번호:</div>
                </CCol>
                <CCol md={4}>
                    <div className="p-3 itmR">{pbancData.bizRegNum}</div>
                </CCol>
                <CCol md={4} />
            </CRow>

            <CCol>
                <div className="p-3 itm">공고상세내용 :</div>
            </CCol>
            <CCol>
                <div className="p-3 itmC">{pbancData.pbancContent}</div>
            </CCol>


        </CContainer>
    );
};

export default DetailPbanc;