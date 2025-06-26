import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    return (
        <div className='flex justify-between items-center mt-6'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirst}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium
                    ${isFirst ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            <span className='text-sm text-gray-600'>
                Page <strong>{currentPage}</strong> of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLast}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium 
                    ${isLast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
