import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CFormTextarea
} from '@coreui/react';
import "./css/Calendar.css";

const generateCalendar = (year, month, rcdList, handleDateClick) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const lastDayOfMonth = new Date(year, month, 0).getDay();
  const calendar = [];

  let headerRow = [];
  for (let i = 0; i < 7; i++) {
    headerRow.push(
      <th key={i} className="calendar-header-cell" style={{ textAlign: 'center' }}>
        {['일', '월', '화', '수', '목', '금', '토'][i]}
      </th>
    );
  }
  calendar.push(<tr key="header">{headerRow}</tr>);

  let currentRow = [];
  for (let i = 1; i <= daysInMonth + firstDayOfMonth + (6 - lastDayOfMonth); i++) {
    if (i > firstDayOfMonth && i <= daysInMonth + firstDayOfMonth) {
      const day = i - firstDayOfMonth;
      const date = new Date(year, month - 1, day);
      const dateString = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

      if (!Array.isArray(rcdList)) {

      } else {
        const hasLog = rcdList.find(item => item.logDate === dateString);
        currentRow.push(
          <td key={i} className="calendar-day-cell" onClick={() => handleDateClick(day)}>
            <div className="flex-container">
              <div className="calendar-day">{day}</div>
              <div className="calendar-info centered-text bold-text large-text">{hasLog ? '작성 완료' : ''}</div>
            </div>
          </td>
        );
      }
    } else {
      currentRow.push(<td key={i} className="calendar-day-cell empty"></td>);
    }
    if (i % 7 === 0) {
      calendar.push(<tr key={calendar.length}>{currentRow}</tr>);
      currentRow = [];
    }
  }
  return calendar;
};



const TngAttend = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTngNo, setSelectedTngNo] = useState(null);
  const [stdntSn, setStdntSn] = useState(null);
  const [rcdList, setRcdList] = useState([]);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState(localStorage.getItem('loginId'));
  const [completedModalOpen, setCompletedModalOpen] = useState(false);
  const [selectedCompletedDate, setSelectedCompletedDate] = useState(null);

  useEffect(() => {
    const selectedTngNo = sessionStorage.getItem("selectedTngNo");
    const stdntSn = sessionStorage.getItem("stdntSn");
    if (!selectedTngNo || !stdntSn) {
      alert("학생을 다시 선택해주세요.");
      navigate('/tngList');
      return;
    }
    setSelectedTngNo(selectedTngNo);
    setStdntSn(stdntSn);
    const userGroupCd = localStorage.getItem('userGroupCd');
    if (userGroupCd !== '50') {
      localStorage.clear();
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    fetchRcdList(selectedTngNo, stdntSn);
  }, [selectedTngNo, stdntSn]);

  const fetchRcdList = () => {
    fetch('/cbb/tng/rcdList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tngNo: selectedTngNo, stdntSn }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setRcdList(data)
      })
      .catch(error => console.error('Error fetching rcdList :', error));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    setYear(newYear);
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setMonth(newMonth);
  };

  const handleDateClick = (day) => {
    const dateString = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
    const hasLog = rcdList.find(item => item.logDate === dateString);

    if (!hasLog) {
      setSelectedDate(day);
      setModalOpen(true);
    } else {
      setSelectedCompletedDate(day);
      setCompletedModalOpen(true);
    }
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>지도일지 작성</strong>
          </CCardHeader>
          <CCardBody>
            <div className="calendar-controls">
              <select value={year} onChange={handleYearChange}>
                {[...Array(2)].map((_, index) => (
                  <option key={currentYear + index} value={currentYear + index}>
                    {currentYear + index}년
                  </option>
                ))}
              </select>
              <select value={month} onChange={handleMonthChange}>
                {[...Array(12)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}월
                  </option>
                ))}
              </select>
            </div>
            <table className="calendar">
              <tbody>
                {generateCalendar(year, month, rcdList, handleDateClick)}
              </tbody>
            </table>
            <AttendInputModal isOpen={modalOpen} onClose={closeModal} selectedDate={selectedDate} year={year} month={month} stdntSn={stdntSn} tngNo={selectedTngNo} loginId={loginId} />
            <CompletedLogModal isOpen={completedModalOpen} onClose={() => setCompletedModalOpen(false)} selectedDate={selectedCompletedDate} stdntSn={stdntSn} year={year} month={month} rcdList={rcdList} tngNo={selectedTngNo} loginId={loginId} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const AttendInputModal = ({ isOpen, onClose, selectedDate, year, month, stdntSn, tngNo, loginId }) => {
  const [evlCn, setEvlCn] = useState("");

  const handleTextareaChange = (e) => {
    setEvlCn(e.target.value);
  };

  const fetchRcdReg = () => {
    fetch('/cbb/tng/rcdReg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tngNo, stdntSn, year, month, day: selectedDate, evlCn, loginId })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => console.error('Error fetching rcdReg :', error));
    selectClose();
  };

  const selectClose = () => {
    onClose();
  };

  return (
    <CModal alignment="center" visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>지도 일지 작성</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5>학번 : {stdntSn}</h5>
        <h5>날짜 : {year}년 {month}월 {selectedDate}일</h5>
        <CFormTextarea
          id="floatingTextarea"
          floatingLabel="지도일지"
          placeholder="Leave a comment here"
          value={evlCn}
          onChange={handleTextareaChange}
          style={{ fontSize: '18px', height: '150px' }}
        ></CFormTextarea>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={fetchRcdReg}>작성완료</CButton>
        <CButton color="secondary" onClick={selectClose}>닫기</CButton>
      </CModalFooter>
    </CModal>
  );
};

const CompletedLogModal = ({ stdntSn, year, month, isOpen, onClose, selectedDate, rcdList, tngNo, loginId }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [evlCn, setEvlCn] = useState("");

  useEffect(() => {
    if (selectedDate !== null) {
      const dateString = `${year}${month.toString().padStart(2, '0')}${selectedDate.toString().padStart(2, '0')}`;
      const selectedRcd = rcdList.find(item => item.logDate === dateString);
      if (selectedRcd && selectedRcd.evlCn) {
        setEvlCn(selectedRcd.evlCn);
      }
    }
  }, [selectedDate, rcdList, year, month]);

  const handleEditClick = () => {
    setReadOnly(!readOnly);
    fetchRcdUpdate();
  };

  const handleTextareaChange = (e) => {
    setEvlCn(e.target.value);
  };

  const fetchRcdUpdate = () => {
    fetch('/cbb/tng/rcdUpd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tngNo, stdntSn, year, month, day: selectedDate, evlCn, loginId })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => console.error('Error fetching rcdReg :', error));
  };

  return (
    <CModal alignment="center" visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>지도 일지 수정</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5>학번 : {stdntSn}</h5>
        <h5>날짜 : {year}년 {month}월 {selectedDate !== null ? selectedDate.toString().padStart(2, '0') : ''}일</h5>
        <CFormTextarea
          id="completedLogTextarea"
          floatingLabel="작성 완료된 일지"
          placeholder="Leave a comment here"
          value={evlCn}
          onChange={handleTextareaChange}
          readOnly={readOnly}
          style={{ fontSize: '18px', height: '150px' }}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleEditClick}>{readOnly ? '수정' : '수정 완료'}</CButton>
        <CButton color="secondary" onClick={onClose}>닫기</CButton>
      </CModalFooter>
    </CModal>
  );
};
export default TngAttend;
