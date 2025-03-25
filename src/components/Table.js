import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function Table() {
  const query = useSelector((state) => state.query.query);
  const headers = useSelector((state) => state.query.headers);
  const rows = useSelector((state) => state.query.rows);

  const csvData = rows.map((row) => {
    let csvRow = {};
    headers.forEach((header) => {
      csvRow[header.field] = row[header.field];
    });
    return csvRow;
  });

  const downloadJSON = () => {
    const jsonData = JSON.stringify(rows, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${new Date().getTime().toString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const styles = {
    section: {
      color: '#4b5563',
      paddingLeft: '1rem'
    },
    outputLabel: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '0.75rem',
      width: '10rem'
    },
    exportContainer: {
      padding: '0.5rem',
      display: 'flex'
    },
    exportButton: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      marginRight: '0.5rem'
    },
    csvButton: {
      backgroundColor: '#2563eb',
      hover: { backgroundColor: '#3b82f6' }
    },
    jsonButton: {
      backgroundColor: '#3b82f6',
      hover: { backgroundColor: '#60a5fa' }
    },
    emptyState: {
      width: '100%',
      display: 'flex',
      textAlign: 'center',
      height: '20rem',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      color: '#9ca3af',
      fontSize: '1.5rem',
      padding: '0 1.5rem'
    },
    gridContainer: {
      height: 350
    }
  };

  return (
    <div>
      {query ? (
        <section style={styles.section}>
          <div style={{display: 'flex', width: '100%', marginTop: '1.5rem'}}>
            <div style={styles.outputLabel}>
              Output / Result :
            </div>
            <div style={styles.exportContainer}>
              <CSVLink
                data={csvData}
                headers={headers.map((header) => ({
                  label: header.headerName,
                  key: header.field,
                }))}
                filename={`${new Date().getTime().toString()}.csv`}
              >
                <button 
                  style={{...styles.exportButton, ...styles.csvButton}}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.csvButton.hover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.csvButton.backgroundColor}
                >
                  <i className="fa-solid fa-file-arrow-down"></i>
                  <span style={{paddingLeft: '0.5rem', fontWeight: 600}}>Export CSV</span>
                </button>
              </CSVLink>

              <button
                onClick={downloadJSON}
                style={{...styles.exportButton, ...styles.jsonButton}}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.jsonButton.hover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.jsonButton.backgroundColor}
              >
                <i className="fa-solid fa-file-arrow-down"></i>
                <span style={{paddingLeft: '0.5rem', fontWeight: 600}}>Export JSON</span>
              </button>
            </div>
          </div>
          {headers.length > 0 && rows.length > 0 && (
            <div className="ag-theme-quartz" style={styles.gridContainer}>
              <AgGridReact
                rowData={rows}
                columnDefs={headers}
                defaultColDef={{ flex: 1 }}
              />
            </div>
          )}
          {headers.length === 0 && rows.length === 0 && (
            <div style={styles.emptyState}>
              No data found
            </div>
          )}
        </section>
      ) : (
        <div style={styles.emptyState}>
          Run Something & Your Output Shall Appear!
        </div>
      )}
    </div>
  );
}

export default Table;