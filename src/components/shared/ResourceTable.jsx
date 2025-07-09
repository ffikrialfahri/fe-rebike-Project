
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
  staticData = null, // New prop for static data
  enableSearch = false,
  enableStatusFilter = false,
  statusOptions = [],
  initialStatus = 'Semua',
  searchPlaceholder = 'Cari...',
  emptyMessage = 'Tidak ada data ditemukan.',
}) => {
  const isStatic = !!staticData;
  const dispatch = !isStatic ? useDispatch() : null;

  // Conditionally use selectors or static data
  const data = isStatic ? staticData : (useSelector(dataSelector) || []);
  const loading = !isStatic && useSelector(loadingSelector);
  const error = !isStatic ? useSelector(errorSelector) : null;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  useEffect(() => {
    if (!isStatic && fetchDataAction) {
      dispatch(fetchDataAction());
    }
  }, [dispatch, fetchDataAction, isStatic]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredData = React.useMemo(() => {
    let result = data || [];

    if (enableStatusFilter && selectedStatus !== 'Semua') {
      result = result.filter(item => {
        const statusColumn = columns.find(c => c.isStatus);
        if (statusColumn && statusColumn.accessor) {
          const status = statusColumn.accessor(item);
          // For static data, accessor might be a string key
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

    return result;
  }, [data, searchTerm, selectedStatus, columns, enableSearch, enableStatusFilter]);

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
    </Card>
  );
};

export default ResourceTable;
