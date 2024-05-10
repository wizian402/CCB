// SearchBar.js
import React from "react";

const SearchBar = ({ searchTermName, setSearchTermName, searchTermItem, setSearchTermItem }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="상담원 이름 검색"
        avalue={searchTermName}
        onChange={(e) => setSearchTermName(e.target.value)}
      />
      <select
        value={searchTermItem}
        onChange={(e) => setSearchTermItem(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="">전체</option>
        <option value="상담 항목 1">상담 항목 1</option>
        <option value="상담 항목 2">상담 항목 2</option>
        <option value="상담 항목 3">상담 항목 3</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default SearchBar;
