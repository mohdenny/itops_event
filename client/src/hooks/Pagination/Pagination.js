import React, { Fragment } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Fragment>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={onPrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={onNext} disabled={currentPage === lastPage}>
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              {' '}
              <span className="font-medium inline-block">{currentPage}</span>
              {' '}
              to
              {' '}
              <span className="font-medium inline-block">{lastPage}</span>
              {' '}
              of
              {' '}
              <span className="font-medium inline-block">{totalCount}</span>
              {' '}
              results
            </p>
          </div>

          <div>
            <nav
              className={classnames('hidden sm:flex-1 sm:flex sm:items-center sm:justify-between', { [className]: className })}
              aria-label='Pagination'
            >
              {/* Left navigation arrow */}
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
                  disabled={currentPage === 1}
                  onClick={onPrevious}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              {paginationRange.map((pageNumber, index) => {
                
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                  return <li className="relative inline-flex items-end px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">&#8230;</li>;
                }
            
                // Render our Page Pills
                return (
                  <button
                    key={index}
                    className={classnames("relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100", {
                      "bg-gray-200": pageNumber === currentPage
                    })}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {/*  Right Navigation arrow */}
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
                disabled={currentPage === lastPage}
                onClick={onNext}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Pagination;