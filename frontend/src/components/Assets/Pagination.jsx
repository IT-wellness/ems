const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className={`px-3 py-1 rounded text-sm border transition 
          ${prevDisabled 
            ? "text-gray-400 border-gray-300 cursor-not-allowed" 
            : "text-blue-600 border-blue-300 hover:bg-blue-50"}`}
      >
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded text-sm border transition 
            ${page === currentPage 
              ? "bg-blue-600 text-white border-blue-600" 
              : "text-blue-600 border-blue-300 hover:bg-blue-50"}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className={`px-3 py-1 rounded text-sm border transition 
          ${nextDisabled 
            ? "text-gray-400 border-gray-300 cursor-not-allowed" 
            : "text-blue-600 border-blue-300 hover:bg-blue-50"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
