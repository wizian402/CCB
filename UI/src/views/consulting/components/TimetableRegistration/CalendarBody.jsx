import React from "react";

const CalendarBody = ({ year, month, handleDateClick }) => {
  const getFirstLastDayOfMonth = () => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    return { firstDayOfMonth, lastDayOfMonth };
  };

  // 현재 날짜와 비교하여 이전 날짜인지 확인하는 함수
  const isPast = (date) => {
    const today = new Date();
    return date < today;
  };

  const isWeekend = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0: Sunday, 6: Saturday
  };

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
          const isPastDate = isPast(currentDate);
          const isWeekendDate = isWeekend(currentDate);
          week.push(
            <td
              key={j}
              onClick={() => !isPastDate && !isWeekendDate && handleDateClick(currentDate)}
              className={isPastDate ? "past-date" : isWeekendDate ? "weekend" : ""}
            >
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

  return <tbody>{generateCalendar()}</tbody>;
};

export default CalendarBody;
