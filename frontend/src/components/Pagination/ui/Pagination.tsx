// import React from 'react';
import styles from "./Pagination.module.scss";

interface PaginationProps {
  handlePageChange: (pageNumber: number) => void
  indexOfLastPost: number
  indexOfFirstPost: number
  totalPages: number
  currentPage: number
}

export const Pagination = (
  {
    handlePageChange,
    totalPages,
    currentPage
  }: PaginationProps) => {


  return (
    <nav aria-label="Page navigation example" className="mt-7">
      <ul className="flex items-center -space-x-px h-10 text-base">

        <button onClick={() => handlePageChange(currentPage - 1)}
                className={styles.prev_btn}
                disabled={currentPage === 1}>
          <span className="sr-only">Previous</span>
          <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M5 1 1 5l4 4"/>
          </svg>
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <li key={i}>
            <button onClick={() => handlePageChange(i + 1)}
                    key={i} className={`${styles.page_li} ${currentPage === i + 1 && styles.active_page}`}>
              {i + 1}
            </button>
          </li>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.next_btn}>
          <span className="sr-only">Next</span>
          <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m1 9 4-4-4-4"/>
          </svg>
        </button>
      </ul>
    </nav>
  );
};

