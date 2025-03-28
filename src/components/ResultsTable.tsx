import React, { CSSProperties } from 'react';
import { CsvToHtmlTable } from "react-csv-to-table";
import { CSVLink } from "react-csv";
import { FileDown } from 'lucide-react';
import { successHandler } from "../utils/toastify";

import {
  categories_csv, 
  customers_csv, 
  employees_csv, 
  shippers_csv, 
  suppliers_csv
} from '../data/csvData';

// Define type for CSV data map
type CsvDataMap = {
  [key: string]: string;
};

// Define props type
interface ResultsTableProps {
  results?: Record<string, any>[];
  displayMode?: 'table' | 'csv';
  queriedTable?: string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ 
  results, 
  displayMode = 'table', 
  queriedTable 
}) => {
  // CSS Styles object with explicit CSSProperties
  const styles: { [key: string]: CSSProperties } = {
    csvContainer: {
      width: '91.666667%',
      margin: '0 auto',
      overflowX: 'auto'
    },
    headerContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerTitle: {
      fontWeight: 'bold',
      fontSize: '1.875rem',
      margin: '1.25rem 0'
    },
    exportButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      margin: '1rem 0',
      cursor: 'pointer'
    },
    noResultsText: {
      color: '#6b7280',
      textAlign: 'center',
      padding: '1rem 0'
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      minWidth: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0'
    },
    tableHeader: {
      backgroundColor: '#f3f4f6'
    },
    tableHeaderCell: {
      padding: '0.75rem 1.5rem',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: 'medium',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: 'wider'
    },
    tableCell: {
      padding: '1rem 1.5rem',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      color: '#111827'
    },
    tableFooter: {
      backgroundColor: '#f3f4f6',
      padding: '0.75rem 1.5rem',
      textAlign: 'left',
      fontSize: '0.75rem',
      color: '#6b7280'
    }
  };

  // Function to get row style based on index
  const getRowStyle = (index: number): CSSProperties => ({
    backgroundColor: index % 2 === 0 ? 'white' : '#f3f4f6'
  });

  // CSV data mapping with type annotation
  const csvDataMap: CsvDataMap = {
    'customers': customers_csv,
    'categories': categories_csv,
    'employees': employees_csv,
    'shippers': shippers_csv,
    'suppliers': suppliers_csv
  };

  // If display mode is CSV and a table is specified
  if (displayMode === 'csv' && queriedTable) {
    const csvData = csvDataMap[queriedTable] || "😕 No data found!";
    
    return (
      <div style={styles.csvContainer}>
        <div style={styles.headerContainer}>
          <h1 style={styles.headerTitle}>Output</h1>
          <CSVLink
            data={csvData}
            filename={queriedTable}
            onClick={() => successHandler("🥳 CSV Downloaded Successfully!")}
            style={styles.exportButton}
          >
            <FileDown style={{margin: '0 0.5rem'}} />
            Export as CSV
          </CSVLink>
        </div>
        <CsvToHtmlTable
          tableClassName="w-full rounded-md"
          data={csvData}
          hasHeader={true}
          allowDownload={true}
          csvDelimiter=","
        />
      </div>
    );
  }

  // Default table display mode (existing implementation)
  if (!results || results.length === 0) {
    return <p style={styles.noResultsText}>No results to display</p>;
  }

  // Safely get columns, with fallback to empty array
  const columns = results[0] ? Object.keys(results[0]) : [];

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                style={styles.tableHeaderCell}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, rowIndex) => (
            <tr key={rowIndex} style={getRowStyle(rowIndex)}>
              {columns.map((column) => (
                <td key={column} style={styles.tableCell}>
                  {typeof row[column] === 'number' ? 
                    row[column].toLocaleString() : 
                    row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length} style={styles.tableFooter}>
              Total Results: {results?.length || 0}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};