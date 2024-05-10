import React from "react";

const DateInput = ({ value, onChange }) => {
  return (
    <div style={{ textAlign: "right" }}>
      <input
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateInput;
