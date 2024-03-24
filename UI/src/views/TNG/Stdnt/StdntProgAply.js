import React, { useState, useEffect  } from 'react';
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
          displayText = '결석';
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
  const [loginId, setLoginId] = useState(localStorage.getItem('loginId'));

  useEffect(() => {
    fetchAttendCd();
    const userGroupCd = localStorage.getItem('userGroupCd');
    if (userGroupCd !== '20') {
      localStorage.clear()
      alert('로그인후 이용가능합니다.')
      navigate('/login');
    }
    fetchAttendList();
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

  const fetchAttendList = () => {
    fetch('/cbb/tng/stdntProg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId }),
    })
      .then(response => response.json())
      .then(data => {

      })
      .catch(error => console.error('Error fetching attendCd list:', error));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>현장 실습 목록</strong>
          </CCardHeader>
          <CCardBody>
            <div className="calendar-container">
              <label htmlFor="year">연도:</label>
              <input type="number" id="year" value={year} onChange={handleYearChange} />
              <label htmlFor="month">월:</label>
              <input type="number" id="month" value={month} onChange={handleMonthChange} />
            </div>
            <table className="calendar">
              <tbody>
              {generateCalendar(year, month, attendList, handleDateClick)}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default TngAttend;
