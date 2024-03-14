import React from "react";
import CalendarBody from "./CalendarBody";
import CalendarControls from "./CalendarControls";
import Modal from "./Modal";
import "../../scss/Calendar.scss";

const Calendar = ({
  year,
  month,
  handleYearChange,
  handleMonthChange,
  handleDateClick,
  selectedDate,
  showModal,
  closeModal,
}) => {
  return (
    <div>
      <h1 className="title">상담 시간표 등록</h1>
      <CalendarControls
        year={year}
        month={month}
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
      />
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
        <CalendarBody year={year} month={month} handleDateClick={handleDateClick} />
      </table>
      <Modal
        year={year}
        month={month}
        selectedDate={selectedDate}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Calendar;
