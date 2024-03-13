// SearchFilters.jsx

import React from 'react';
import "../scss/SearchFilters.scss"

const SearchFilters = ({ 
  itemOptions, 
  timeOptions, 
  handleSearchItem, 
  handleSearchDate, 
  handleSearchTime, 
  searchTerm, 
  handleSearch 
}) => {
  return (
    <div className="searchContainer">
      <div className="selectContainer">
        <select onChange={handleSearchItem}>
          <option value="">상담 항목 선택</option>
          {itemOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="date" onChange={handleSearchDate}></input>
        <select onChange={handleSearchTime}>
          <option value="">- : --</option>
          {timeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="상담원 이름 검색"
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
    </div>
  );
};

export default SearchFilters;
