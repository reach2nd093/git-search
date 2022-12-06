import React, { useState, useEffect } from 'react';
import './pagination.css';

const Pagination = (props: { 
  handleSetPage: Function, 
  currentPage: number,
  totalItems: number,
  itemsPerPage: number,
}) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const { handleSetPage, currentPage, totalItems, itemsPerPage } = props;

  const onPageChange = (action: string) => {
    if(action === 'next') {
      handleSetPage(currentPage + 1);
    } else {
      handleSetPage(currentPage - 1);
    }
  }

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  return (
    <div className="pagination-wrapper">
      <button 
        type="button"
        onClick={() => onPageChange("prev")}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <p>
        Page: {currentPage} / {totalPages}
      </p>
      <button 
        type="button"
        onClick={() => onPageChange("next")}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination;