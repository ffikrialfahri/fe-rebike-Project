import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ClipboardList, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

const ResourceTable = ({
  title,
  fetchDataAction,
  dataSelector,
  loadingSelector,
  errorSelector,
  columns,
  enableSearch = false,
  enableStatusFilter = false,
  statusOptions = [],
  initialStatus = 'Semua',
  searchPlaceholder = 'Cari...',
  emptyMessage = 'Tidak ada data ditemukan.',
  clientSidePagination = false,
}) => {
  const dispatch = useDispatch();

  const rawData = useSelector(dataSelector) || [];
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const serverPagination = useSelector((state) => state.admin.pagination);

  const [currentPage, setCurrentPage] = useState(0);
  
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const itemsPerPage = 10;

  useEffect(() => {
    if (fetchDataAction) {
      if (clientSidePagination) {
        dispatch(fetchDataAction());
      } else {
        dispatch(fetchDataAction({ page: currentPage, size: itemsPerPage }));
      }
    }
  }, [dispatch, fetchDataAction, currentPage, clientSidePagination]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput);
    setCurrentPage(0);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  
  const handlePageClick = (page) => {
    setCurrentPage(page - 1);
  }

  const generatePageNumbers = () => {
    const totalPages = currentPagination.totalPages;
    const currentPageNum = currentPagination.page + 1;
    const pageNumbers = [];
    const siblingCount = 1;
    
    pageNumbers.push(1);
    
    if (currentPageNum > siblingCount + 2) {
      pageNumbers.push('...');
    }

    const starPage = Math.max(2, currentPageNum - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPageNum + siblingCount);
    for (let i = starPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPageNum < totalPages - siblingCount - 1) {
      pageNumbers.push('...');
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }

  const filteredData = React.useMemo(() => {
    let result = rawData || [];

    if (enableStatusFilter && selectedStatus !== 'Semua') {
      result = result.filter(item => {
        const statusColumn = columns.find(c => c.isStatus);
        if (statusColumn && statusColumn.accessor) {
          const status = statusColumn.accessor(item);
          return status === selectedStatus;
        }
        return false;
      });
    }

    if (enableSearch && searchTerm) {
      result = result.filter(item =>
        columns.some(column => {
          const value = column.accessor(item);
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (clientSidePagination) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return result.slice(startIndex, endIndex);
    }

    return result;
  }, [rawData, searchTerm, selectedStatus, columns, enableSearch, enableStatusFilter, clientSidePagination, currentPage]);

  const currentPagination = clientSidePagination
    ? {
        page: currentPage,
        size: itemsPerPage,
        totalElements: (rawData || []).length,
        totalPages: Math.ceil((rawData || []).length / itemsPerPage),
      }
    : serverPagination;

  const tableColumns = [
    { 
      header: 'NO',
      cell: (item, index) => <span>{currentPage * itemsPerPage + index + 1}</span>
    },
    ...columns
  ];

  return (
    <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 border-b border-gray-200 pb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {enableSearch && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  className="border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
              </div>
              <button
                onClick={handleSearchSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cari
              </button>
            </div>
          )}
          {enableStatusFilter && (
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
            >
              <option value="Semua">Semua Status</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {tableColumns.map((col, index) => (
                <th
                  key={index}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={tableColumns.length} className="text-center py-10">Memuat data...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={tableColumns.length} className="text-center py-10 text-red-500">Error: {error.message || 'Gagal memuat data'}</td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {tableColumns.map((col, colIndex) => (
                    <td key={colIndex} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {col.cell ? col.cell(item, rowIndex) : <p className="text-gray-900 whitespace-no-wrap">{col.accessor(item)}</p>}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableColumns.length} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {currentPagination && currentPagination.totalPages > 1 && !clientSidePagination && (
        <div className="flex justify-center mt-6">
          <nav
            className="flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
            aria-label="Pagination"
            >
            <button
                onClick={handlePrevPage}
                disabled={currentPagination.page === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            {generatePageNumbers().map((page, index) => (
              <div key={index} className="flex items-center">
                <span className="h-full border-l border-gray-200"></span>
                {page === '...' ? (
                  <span className="px-4 py-2 text-sm font-medium text-gray-700">...</span>
                ) : (
                  <button
                  onClick={() => handlePageClick(page)}
                  className={`px-4 py-2 text-sm font-medium
                      ${currentPagination.page + 1 === page
                        ? 'border-t-2 border-b-2 border-indigo-500 text-indigo-600 font-bold bg-indigo-50'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      arial-current={currentPagination.page + 1 === page ? 'page' : undefined}
                      >
                    {page}
                  </button>
                )}
              </div>
            ))}

            <div className='flex items-center'>
              <span className='h-full border-l border-gray-200'></span>
              <button
                onClick={handleNextPage}
                disabled={currentPagination.page + 1 >= currentPagination.totalPages}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          
          </nav>
          
        </div>
      )}
    </Card>
  );
};

export default ResourceTable;