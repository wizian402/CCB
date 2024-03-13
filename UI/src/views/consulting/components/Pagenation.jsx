import React from "react";
import "../scss/Pagenation.scss"; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 번호를 클릭했을 때 해당 페이지로 이동하는 함수
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  // 중앙 기준으로 표시할 페이지 범위를 계산합니다.
  const maxPageButtons = 4;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // startPage를 재조정합니다.
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  // 페이지 번호 배열을 생성합니다.
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationButtons">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </button>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => handlePageClick(number)} className={currentPage === number ? "active" : ""}>{number}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
};

export default Pagination;
