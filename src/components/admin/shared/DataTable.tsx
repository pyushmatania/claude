import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, useRowSelect, useFilters, useGlobalFilter, useResizeColumns, useFlexLayout, Column, HeaderGroup, Row, Cell, TableInstance, UsePaginationInstanceProps } from 'react-table';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, Edit, Trash, MoreHorizontal, Download, Columns as ColumnsIcon } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
// @ts-expect-error: If you get a type error here, install @types/file-saver
type _FileSaver = typeof import('file-saver');
import { saveAs } from 'file-saver';

// Simple Spinner
const Spinner = () => <div className="flex justify-center items-center py-8"><div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div></div>;

// Global Filter UI
function GlobalFilter({ globalFilter, setGlobalFilter }: { globalFilter: string; setGlobalFilter: (filterValue: string) => void }) {
  return (
    <input
      className="mb-4 px-4 py-2 border rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
      value={globalFilter || ''}
      onChange={e => setGlobalFilter(e.target.value)}
      placeholder="Search all..."
    />
  );
}

// Column Filter UI
function DefaultColumnFilter({ column }: { column: { filterValue: string; setFilter: (filterValue: string) => void; Header: string } }) {
  const { filterValue, setFilter, Header } = column;
  return (
    <input
      className="px-2 py-1 border rounded w-full text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value)}
      placeholder={`Filter ${Header}`}
    />
  );
}

// Selection column helper for react-table
function IndeterminateCheckbox({ indeterminate, ...rest }: { indeterminate?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  return <input type="checkbox" ref={ref} {...rest} />;
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  onViewRow?: (row: T) => void;
}

function exportToCSV<T extends object>(rows: Row<T>[], columns: Column<T>[], filename = 'table.csv') {
  const visibleColumns = columns.filter((col: any) => !col.isHidden && col.id !== 'selection' && col.id !== 'actions');
  const header = visibleColumns.map((col: any) => col.Header).join(',');
  const csvRows = rows.map(row =>
    visibleColumns.map((col: any) => {
      const value = row.values[col.id];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}` : value;
    }).join(',')
  );
  const csvContent = [header, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}

const DataTable = <T extends object>({
  columns,
  data,
  onSort,
  sortField,
  sortDirection,
  loading = false,
  onEditRow,
  onDeleteRow,
  onViewRow
}: DataTableProps<T>) => {
  const { theme } = useTheme();
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Add selection and actions columns
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, minWidth: 80, width: 150 }), []);
  const actionColumn = useMemo(() => [{
    id: 'actions',
    Header: 'Actions',
    disableSortBy: true,
    disableFilters: true,
    minWidth: 120,
    width: 120,
    Cell: ({ row }: { row: Row<T> }) => (
      <div className="flex gap-2">
        <button onClick={() => onViewRow && onViewRow(row.original)} className="p-1 rounded hover:bg-purple-100"><Eye className="w-4 h-4" /></button>
        <button onClick={() => onEditRow && onEditRow(row.original)} className="p-1 rounded hover:bg-yellow-100"><Edit className="w-4 h-4" /></button>
        <button onClick={() => onDeleteRow && onDeleteRow(row.original)} className="p-1 rounded hover:bg-red-100"><Trash className="w-4 h-4" /></button>
      </div>
    )
  }], [onEditRow, onDeleteRow, onViewRow]);

  const tableInstance = useTable<T>(
    {
      columns: useMemo(() => {
        const selectionCol: Column<T> = {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }: any) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: { row: Row<T> }) => (
            <IndeterminateCheckbox {...(row as any).getToggleRowSelectedProps()} />
          ),
          minWidth: 40,
          width: 40
        };
        return [selectionCol, ...columns, ...actionColumn] as Column<T>[];
      }, [columns, actionColumn]),
      data,
      defaultColumn,
      initialState: { hiddenColumns: [] }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useFlexLayout
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
    setGlobalFilter,
    allColumns,
    setHiddenColumns,
    selectedFlatRows
  } = tableInstance as TableInstance<T> & UsePaginationInstanceProps<T> & any;

  // Extract pageIndex and pageSize from state.pagination if available
  const pageIndex = (state as any).pagination?.pageIndex ?? 0;
  const pageSize = (state as any).pagination?.pageSize ?? 10;

  const handleSort = (column: HeaderGroup<T>) => {
    if (onSort && column.id) {
      onSort(column.id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-x-auto bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      {/* Controls Row */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 mb-2 px-2 pt-2">
        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={() => exportToCSV(page, allColumns, 'table.csv')}
            className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Export table as CSV"
            title="Export table as CSV"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <div className="relative">
            <button
              onClick={() => setShowColumnMenu(v => !v)}
              className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Show/hide columns"
              title="Show/hide columns"
            >
              <ColumnsIcon className="w-4 h-4" /> Columns
            </button>
            {showColumnMenu && (
              <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-50 p-2 min-w-[160px] dark:bg-gray-900 dark:border-gray-700">
                {allColumns.filter((col: any) => col.id !== 'selection' && col.id !== 'actions').map((column: any) => (
                  <div key={column.id} className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={!column.isHidden}
                      onChange={() => column.toggleHidden()}
                      aria-label={`Toggle column ${column.Header}`}
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-200">{column.Header}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 hidden md:inline">{selectedFlatRows.length > 0 && `${selectedFlatRows.length} selected`}</span>
        </div>
        <div className="flex-1 min-w-[200px] max-w-xs">
          <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto rounded-b-xl">
        <table 
          {...getTableProps()} 
          className="w-full min-w-[700px] border-separate border-spacing-0"
          aria-label="Data table"
        >
          <thead className={`sticky top-0 z-20 transition-colors duration-300 ${theme === 'light' ? 'bg-pink-100/90' : 'bg-gray-900/90'}`}>
            {headerGroups.map((headerGroup: HeaderGroup<T>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, colIdx: number) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 ${theme === 'light' ? 'text-gray-900' : 'text-white'} ${colIdx === 0 ? 'sticky left-0 z-30 bg-inherit' : ''}`}
                    onClick={() => handleSort(column)}
                    style={{ cursor: onSort ? 'pointer' : 'default', position: 'relative', minWidth: column.minWidth, width: column.width }}
                    aria-sort={onSort && sortField === column.id ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <div className="flex items-center gap-2">
                      {column.render('Header')}
                      {column.canResize && (
                        <div {...column.getResizerProps()} className="w-1 h-6 bg-gray-300 hover:bg-purple-400 cursor-col-resize absolute right-0 top-1/2 -translate-y-1/2 rounded-full transition-colors duration-200" />
                      )}
                      {onSort && sortField === column.id && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="w-4 h-4 transition-transform duration-200" /> : 
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                      )}
                    </div>
                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className={`${theme === 'light' ? 'bg-white divide-y divide-gray-100' : 'divide-y divide-gray-800'} transition-colors duration-300`}
          >
            {loading ? (
              <tr><td colSpan={allColumns.length}><div className="flex flex-col items-center py-8 text-purple-400"><Spinner /><span className="mt-2 text-sm">Loading...</span></div></td></tr>
            ) : page.length === 0 ? (
              <tr><td colSpan={allColumns.length}><div className="flex flex-col items-center py-8 text-gray-400"><span className="text-4xl">😕</span><span className="mt-2 text-sm">No data available.</span></div></td></tr>
            ) : (
              page.map((row: Row<T>, rowIdx: number) => {
                prepareRow(row);
                return (
                  <tr 
                    {...row.getRowProps()}
                    className={`${theme === 'light' ? (rowIdx % 2 === 0 ? 'bg-white' : 'bg-pink-50') : (rowIdx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800')} hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-150 ${(row as any).isSelected ? 'ring-2 ring-purple-400' : ''}`}
                  >
                    {row.cells.map((cell: Cell<T>, colIdx: number) => {
                      const value = cell.value;
                      const isLong = typeof value === 'string' && value.length > 32;
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`px-4 py-3 max-w-xs whitespace-nowrap overflow-ellipsis overflow-hidden text-sm ${colIdx === 0 ? 'sticky left-0 z-20 bg-inherit' : ''}`}
                          title={isLong ? value : undefined}
                          tabIndex={0}
                        >
                          {isLong ? (
                            <span className="truncate block" aria-label={value}>{value.slice(0, 32)}…</span>
                          ) : (
                            cell.render('Cell')
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={`px-4 py-3 flex flex-col md:flex-row items-center justify-between border-t gap-2 ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
      }`}>
        <div className="flex-1 flex justify-between w-full md:w-auto mb-2 md:mb-0">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
              theme === 'light'
                ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                : 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600'
            } ${!canPreviousPage && 'opacity-50 cursor-not-allowed'}`}
            aria-label="Previous page"
            title="Previous page"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
              theme === 'light'
                ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                : 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600'
            } ${!canNextPage && 'opacity-50 cursor-not-allowed'}`}
            aria-label="Next page"
            title="Next page"
          >
            Next
          </button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between w-full md:w-auto">
          <div>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
              aria-live="polite">
              Showing <span className="font-medium">{pageIndex * pageSize + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min((pageIndex + 1) * pageSize, data.length)}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
                  theme === 'light'
                    ? 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${!canPreviousPage && 'opacity-50 cursor-not-allowed'}`}
                aria-label="First page"
                title="First page"
              >
                <span className="sr-only">First</span>
                <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
                  theme === 'light'
                    ? 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${!canPreviousPage && 'opacity-50 cursor-not-allowed'}`}
                aria-label="Previous page"
                title="Previous page"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Page Numbers */}
              {[...Array(Math.min(5, pageCount))].map((_, i) => {
                const pageNum = pageIndex - 2 + i;
                if (pageNum >= 0 && pageNum < pageCount) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => gotoPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
                        pageNum === pageIndex
                          ? theme === 'light'
                            ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                            : 'z-10 bg-purple-900/30 border-purple-500 text-purple-300'
                          : theme === 'light'
                            ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                      aria-label={`Go to page ${pageNum + 1}`}
                      title={`Go to page ${pageNum + 1}`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
                  theme === 'light'
                    ? 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${!canNextPage && 'opacity-50 cursor-not-allowed'}`}
                aria-label="Next page"
                title="Next page"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200 ${
                  theme === 'light'
                    ? 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${!canNextPage && 'opacity-50 cursor-not-allowed'}`}
                aria-label="Last page"
                title="Last page"
              >
                <span className="sr-only">Last</span>
                <ChevronsRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;