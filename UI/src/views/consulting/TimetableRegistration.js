import React, { useState } from "react";
import Calendar from "./components/TimetableRegistration/Calendar";
import "./scss/Calendar.scss";

const CalendarContainer = () => {
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

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  return (
    <Calendar
      year={year}
      month={month}
      handleYearChange={handleYearChange}
      handleMonthChange={handleMonthChange}
      handleDateClick={handleDateClick}
      selectedDate={selectedDate}
      showModal={showModal}
      closeModal={closeModal}
    />
  );
};

export default CalendarContainer;
