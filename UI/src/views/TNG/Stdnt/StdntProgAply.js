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
import "./css/StdntProgAply.css";

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
      <th key={i} className="calendar-header-cell" style={{ textAlign: 'center', fontSize: '30px', backgroundColor: '#4f5d73', color: 'white' }}>
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
      let backgroundColor = '';

      switch (attendCode) {
        case '10':
          displayText = '출석';
          backgroundColor = '#66a3ff';
          break;
        case '20':
          displayText = '지각';
          backgroundColor = '#ffcc00';
          break;
        case '30':
          displayText = '조퇴';
          backgroundColor = '#ffcc00';
          break;
        case '40':
          displayText = '결석';
          backgroundColor = '#ff6666';
          break;
        default:
          displayText = '';
          backgroundColor = 'inherit';
      }

      currentRow.push(
        <td key={i} className={`calendar-day-cell ${attendCode && 'attendance-' + attendCode}`} onClick={() => handleDateClick(day)} style={{ backgroundColor }}>
          <div className="flex-container">
            <div className="calendar-day">{day}</div>
            {displayText && <div className="calendar-info centered-text bold-text large-text" style={{ fontSize: '25px' }} >{displayText}</div>}
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
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [attendCd, setAttendCd] = useState("");
  const [attendList, setAttendList] = useState("");
  const [loginId, setLoginId] = useState(localStorage.getItem('loginId'));
  const currentYear = new Date().getFullYear();
  const [tngData, setTngData] = useState("");

  useEffect(() => {
    fetchAttendCd();
    const userGroupCd = localStorage.getItem('userGroupCd');
    if (userGroupCd !== '20') {
      localStorage.clear()
      alert('로그인후 이용가능합니다.')
      navigate('/login');
    }
    fetchAttendList();
    fetchStndtTng();
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
        setAttendList(data);
      })
      .catch(error => {
        console.error('Error fetching attendCd list:', error)
        alert("진행중인 현장실습이 없습니다.")
        navigate('/stdntAply');
      });
  };

  const fetchStndtTng = () => {
    fetch('/cbb/tng/stndtTng', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId }),
    })
      .then(response => response.json())
      .then(data => {
        setTngData(data)
      })
      .catch(error => {
        console.error('Error fetching attendCd list:', error)
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>진행중인 현장 실습</strong>
          </CCardHeader>
          <CCardBody>
            <div className="container">
              <div className="row">
                <h2 className="column">산업체 명 : {tngData.bzentyNm}</h2>
                <h2 className="column">업무 : {tngData.tkcgTaskNm}</h2>
              </div>
              <div className="row">
                <h2 className="column">현장 실습 시작일 : {tngData.tngStYmd}</h2>
                <h2 className="column">현장 실습 종료일 : {tngData.tngEndYmd}</h2>
              </div>
              <div className="row">
                <h2 className="column">이수 기준 시간 : {tngData.cmcrsHr}시간</h2>
                <h2 className="column">실습 시간 : {tngData.ttrHr}시간</h2>
              </div>
              <div className="row">
                {tngData.grd ? (
                  <h2 className="column">성적: {tngData.grd}</h2>
                ) : (
                  <h2 className="column">성적: 미입력</h2>
                )}
              </div>
            </div>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default TngAttend;
