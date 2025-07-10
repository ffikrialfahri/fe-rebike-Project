
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ClipboardList, Search } from 'lucide-react';
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
  clientSidePagination = false, // New prop
}) => {
  const dispatch = useDispatch();

  const rawData = useSelector(dataSelector) || [];
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const serverPagination = useSelector((state) => state.admin.pagination);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const itemsPerPage = 20; // Max data per page

  useEffect(() => {
    if (fetchDataAction) {
      if (clientSidePagination) {
        dispatch(fetchDataAction());
      } else {
        dispatch(fetchDataAction({ page: currentPage, size: itemsPerPage }));
      }
    }
  }, [dispatch, fetchDataAction, currentPage, clientSidePagination]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset page on search
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(0); // Reset page on status filter
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const filteredData = React.useMemo(() => {
    let result = rawData || [];

    if (enableStatusFilter && selectedStatus !== 'Semua') {
      result = result.filter(item => {
        const statusColumn = columns.find(c => c.isStatus);
        if (statusColumn && statusColumn.accessor) {
          const status = statusColumn.accessor(item);
          const itemStatus = typeof status === 'function' ? status(item) : item[status];
          return itemStatus === selectedStatus;
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

    // Apply client-side pagination if enabled
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

  return (
    <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 border-b border-gray-200 pb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {enableSearch && (
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
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
              {columns.map((col, index) => (
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
                <td colSpan={columns.length} className="text-center py-10">Memuat data...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-red-500">Error: {error.message || 'Gagal memuat data'}</td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {col.cell ? col.cell(item) : <p className="text-gray-900 whitespace-no-wrap">{col.accessor(item)}</p>}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
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
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPagination.page === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPagination.page + 1 >= currentPagination.totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </Card>
  );
};

export default ResourceTable;
