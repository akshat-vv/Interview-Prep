import React, { useState } from "react";
import { useSelector } from "react-redux";

const PaginationComponent = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const numberOfPages = Math.ceil(items.length / itemsPerPage);

  const itemsToShow = items.slice(startIndex, endIndex);

  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  if (items.length === 0) return <div>No items to show</div>;
  return (
    <div>
      {itemsToShow.map((item) => {
        return (
          <p key={item.id}>
            {item.id} {item.title}
          </p>
        );
      })}
      <div className="pagination-container">
  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
    Prev
  </button>
  {Array.from({ length: numberOfPages }, (_, i) => (
    <button key={i} onClick={() => handlePageChange(i)}>{i + 1}</button>
  ))}
  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === numberOfPages - 1}>
    Next
  </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
