import React from "react";
import "../scss/SearchInput.scss"

const SearchInput = ({ searchTerm, handleSearch }) => {
  return (
    <div className="searchInputContainer">
      <input
        type="text"
        placeholder="상담 항목 검색"
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
    </div>
  );
};

export default SearchInput;
