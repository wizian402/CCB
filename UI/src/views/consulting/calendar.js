import React, { useState } from "react";
import "./scss/Calendar.scss";

const Calendar = () => {
  const handleRegisterClick = () => {
    // 서버로 보낼 데이터 준비
    const data = {
      year: year,
      month: month,
      day: selectedDate.getDate(),
      // 선택된 시간대 처리
      // 예: 시간대 1부터 8까지의 선택 여부를 배열에 담음
      timeSlots: Array.from({ length: 8 }, (_, index) => {
        return document.getElementById(`timeSlot${index + 1}`).checked;
      }),
    };

    console.log(data);
    // 서버 URL 설정
    const url = `http://localhost:8181/cbb/consulting/schedules`; // 실제 서버 URL로 변경해야 함

    // fetch API를 사용하여 POST 요청 보내기
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 서버 응답 처리
        console.log("서버 응답:", data);
        // 등록 성공 시 모달 닫기
        closeModal();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        // 에러 처리
      });
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const getFirstLastDayOfMonth = () => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    return { firstDayOfMonth, lastDayOfMonth };
  };

  const currentYear = new Date().getFullYear();

  const generateCalendar = () => {
    const { firstDayOfMonth, lastDayOfMonth } = getFirstLastDayOfMonth();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();
    const calendar = [];

    let date = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          week.push(<td key={j}></td>);
        } else if (date > lastDateOfMonth) {
          break;
        } else {
          const currentDate = new Date(year, month - 1, date);
          week.push(
            <td key={j} onClick={() => handleDateClick(currentDate)}>
              {date}
            </td>
          );
          date++;
        }
      }

      calendar.push(<tr key={i}>{week}</tr>);
    }

    return calendar;
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  return (
    <div>
      <h1 className="title">상담 시간표 조회</h1>
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
      <table className="calendar-table">
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
      {/* 모달 */}
      {showModal && (
        <div className="Calendermodal">
          <div className="modal-content">
            <h2>
              {`${year}년 ${month}월 ${selectedDate.getDate()}일`}
              <br />
              시간표 등록
            </h2>
            <div className="checkboxes">
              {[...Array(9)].map((_, index) => {
                if (index === 4) return null; // 13시는 제외
                const startTime = ("0" + (9 + index)).slice(-2) + ":00";
                const endTime = ("0" + (9 + index)).slice(-2) + ":50";
                return (
                  <div key={index} className="checkbox">
                    <label
                      htmlFor={`timeSlot${index + 1}`}
                    >{`${startTime} ~ ${endTime}`}</label>
                    <input
                      type="checkbox"
                      id={`timeSlot${index + 1}`}
                      name={`timeSlot${index + 1}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="button-container">
              <button onClick={handleRegisterClick} className="register-button">
                등록
              </button>
              <button onClick={closeModal} className="close-button">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
