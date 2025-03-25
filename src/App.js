import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import QueryHistory from "./components/QueryHistory";
import SqlEditor from "./components/SqlEditor";
import Table from "./components/Table";
import DataDraw from "./components/TableDrawer/DataDraw";
import {
  setQuery,
  setValue,
  setDefaults,
  setHeaders,
  setRows,
  setCSVData,
  setQueryHistory,
} from "./slices/querySlice";
import data from "./DataStore/data.json";

function App() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);
  const value = useSelector((state) => state.query.value);
  const headers = useSelector((state) => state.query.headers);
  const rows = useSelector((state) => state.query.rows);
  const defaults = useSelector((state) => state.query.defaults);
  const csvData = useSelector((state) => state.query.csvData);
  const queryHistory = useSelector((state) => state.query.queryHistory);
  const tableNames = Object.keys(data);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let tableHeaders = [];
  let tableRows = [];

  if (defaults > 0 && defaults <= tableNames.length) {
    tableHeaders = data[tableNames[defaults - 1]].headers;
    tableRows = data[tableNames[defaults - 1]].data;
  }

  useEffect(() => {
    if (value === "") {
      toast.error("Please remove the code and run the query");
    }
  }, [value]);

  const runQuery = () => {
    dispatch(setQuery(value));
    dispatch(setQueryHistory(value));

    const regex = /\bfrom\s+(\w+)\b/i;
    const match = value.match(regex);
    const extractedTableName = match ? match[1].toLowerCase() : null;

    if (tableNames.some((name) => name.toLowerCase() === extractedTableName)) {
      const selectedTable = data[extractedTableName];
      const allHeaders = selectedTable.headers;
      const allRows = selectedTable.data;

      const columnRegex = /\bselect\s+(.+)\s+from\b/i;
      const columnMatch = value.match(columnRegex);
      const columns = columnMatch
        ? columnMatch[1].split(",").map((col) => col.trim())
        : ["*"];

      if (columns.includes("*")) {
        dispatch(setHeaders(allHeaders));
        dispatch(setRows(allRows));
      } else {
        const filteredHeaders = allHeaders.filter((header) =>
          columns.includes(header.field)
        );
        const filteredRows = allRows.map((row) => {
          let newRow = {};
          filteredHeaders.forEach((header) => {
            newRow[header.field] = row[header.field];
          });
          return newRow;
        });

        dispatch(setHeaders(filteredHeaders));
        dispatch(setRows(filteredRows));
      }
    } else {
      dispatch(setHeaders([]));
      dispatch(setRows([]));
    }
  };

  const reset = () => {
    dispatch(setQuery(""));
    dispatch(setValue("select * from customers;"));
    dispatch(setDefaults(1));
    dispatch(setHeaders([]));
    dispatch(setRows([]));
    dispatch(setCSVData([]));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
      <div style={{ width: windowWidth >= 1024 ? "25%" : "100%" }}>
        <DataDraw />
      </div>
      <div style={{ width: windowWidth >= 1024 ? "75%" : "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
          <div style={{ width: windowWidth >= 1024 ? "75%" : "100%" }}>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}></div>
            <SqlEditor
              value={value}
              setValue={(val) => dispatch(setValue(val))}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ padding: "8px" }}>
                <button
                  onClick={reset}
                  style={{
                    display: "flex",
                    margin: "0 auto",
                    color: "white",
                    backgroundColor: "#2563eb",
                    border: "none",
                    padding: "8px 16px",
                    outline: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
                >
                  <div style={{ fontWeight: "600" }}>Clear</div>
                </button>
              </div>
              <div style={{ padding: "8px" }}>
                <button
                  onClick={runQuery}
                  style={{
                    display: "flex",
                    margin: "0 auto",
                    color: "white",
                    backgroundColor: "#3b82f6",
                    border: "none",
                    padding: "8px 16px",
                    outline: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
                >
                  <div style={{ fontWeight: "600" }}>Execute</div>
                </button>
              </div>
            </div>
          </div>
          <div style={{ width: windowWidth >= 1024 ? "25%" : "100%" }}>
            <QueryHistory />
          </div>
        </div>
        <div style={{ width: windowWidth >= 1024 ? "75%" : "100%" }}>
        <Table query={query} headers={headers} rows={rows} csvData={csvData} />
        </div>
      </div>
      <Toaster
        position="bottom-left"
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
}

export default App;