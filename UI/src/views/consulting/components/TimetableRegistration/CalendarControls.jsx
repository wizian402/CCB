import React from "react";

const CalendarControls = ({ year, month, handleYearChange, handleMonthChange }) => {
  const currentYear = new Date().getFullYear();

  return (
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
  );
};

export default CalendarControls;
