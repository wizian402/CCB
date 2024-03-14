import React from "react";
import "../scss/SearchInput.scss";

const SearchInput = ({ searchTerm, handleSearch }) => {
  return (
    <div className="searchInputContainer">
      <input
        type="text"
        placeholder="상담 항목 검색"
        value={searchTerm || ''} // searchTerm이 null이면 빈 문자열로 설정
        onChange={handleSearch}
        className="searchInput"
      />
    </div>
  );
};

export default SearchInput;
