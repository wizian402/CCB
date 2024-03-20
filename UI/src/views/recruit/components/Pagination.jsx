import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <CPagination aria-label="Page navigation example" align="center">
      <CPaginationItem
        aria-label="Previous"
        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {[...Array(totalPages)].map((_, index) => (
        <CPaginationItem
          key={index}
          active={index + 1 === currentPage}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </CPaginationItem>
      ))}
      <CPaginationItem
        aria-label="Next"
        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  );
};

export default Pagination;
