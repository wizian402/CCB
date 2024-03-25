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
  CDropdownMenu
} from '@coreui/react';
import "./css/Calendar.css";

const generateCalendar = (year, month, attendList, handleDateClick) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const lastDayOfMonth = new Date(year, month, 0).getDay(); // 마지막 날의 요일
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
      let attendCode = "";

      if (Array.isArray(attendList)) {
        attendCode = attendList.find(item => item.attendanceDate === dateString)?.tngAtndcCd || "";
      }

      let displayText = '';
      switch (attendCode) {
        case '10':
          displayText = '출석';
          break;
        case '20':
          displayText = '지각';
          break;
        case '30':
          displayText = '조퇴';
          break;
        case '40':
          displayText = '격석';
          break;
        default:
          displayText = '';
      }

      currentRow.push(
        <td key={i} className="calendar-day-cell" onClick={() => handleDateClick(day)}>
          <div className="flex-container">
            <div className="calendar-day">{day}</div>
            {displayText && <div className="calendar-info centered-text bold-text large-text">{displayText}</div>}
          </div>
        </td>
      );


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
  const [attendCd, setAttendCd] = useState("");
  const [attendList, setAttendList] = useState("");
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

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
    fetchAttendCd();

    const userGroupCd = localStorage.getItem('userGroupCd');
    if (userGroupCd !== '50') {
      localStorage.clear();
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    }
  }, []);

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
    let attendCode = "";

    if (Array.isArray(attendList)) {
      attendCode = attendList.find(item => item.attendanceDate === dateString)?.tngAtndcCd || "";
    }

    if (!attendCode) {
      setSelectedDate(day);
      setModalOpen(true);
    }
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchAttendCd = () => {
    fetch('/cbb/tng/attentCd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAttendCd(data);
      })
      .catch(error => console.error('Error fetching attendCd list:', error));
  };

  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);

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
                {generateCalendar(year, month, attendList, handleDateClick)}
              </tbody>
            </table>
            <AttendInputModal isOpen={modalOpen} onClose={closeModal} selectedDate={selectedDate} year={year} month={month} attendCd={attendCd} stdntSn={stdntSn} tngNo={selectedTngNo} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const AttendInputModal = ({ isOpen, onClose, selectedDate, year, month, attendCd, stdntSn, tngNo }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionCd, setSelectedOptionCd] = useState(null);

  const dropdownItems = Object.keys(attendCd).map((key) => (
    <CDropdownItem key={attendCd[key].cd} onClick={() => {
      setSelectedOption(attendCd[key].nm);
      setSelectedOptionCd(attendCd[key].cd);
    }}>
      {attendCd[key].nm}
    </CDropdownItem>
  ));


  const fetchAttendReg = () => {
    fetch('/cbb/tng/attentReg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tngNo, stdntSn, year, month, day: selectedDate, cd: selectedOptionCd }),
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => console.error('Error fetching attentReg :', error));
    selectClose();
  };

  const selectClose = () => {
    setSelectedOption(null);
    setSelectedOptionCd(null);
    onClose();
  };

  return (
    <CModal alignment="center" visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>출석 입력</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>학번 : {stdntSn}</p>
        <p>날짜 : {year}년 {month}월 {selectedDate}일</p>
        <CDropdown>
          <CDropdownToggle color="secondary" size="sm">
            {selectedOption || "출석 입력"}
          </CDropdownToggle>
          <CDropdownMenu>
            {dropdownItems}
          </CDropdownMenu>
        </CDropdown>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={fetchAttendReg}>출석 입력</CButton>
        <CButton color="secondary" onClick={selectClose}>닫기</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default TngAttend;
