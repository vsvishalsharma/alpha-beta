import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../slices/querySlice";

function TableStructure({ tableName, tableHead }) {
  const dispatch = useDispatch();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const queryHistory = useSelector((state) => state.query.queryHistory);

  const handleColumnClick = (column) => {
    const newSelectedColumns = [...selectedColumns];
    if (!newSelectedColumns.includes(column)) {
      newSelectedColumns.push(column);
    }
    setSelectedColumns(newSelectedColumns);
    let columnsString = newSelectedColumns.join(", ");
    const query = `SELECT ${columnsString} FROM ${tableName}`;
    dispatch(setValue(query));
  };

  const handleTableClick = () => {
    setSelectedColumns([]);
    const query = `SELECT * FROM ${tableName}`;
    dispatch(setValue(query));
  };

  return (
    
    <div style={{ margin: "0 2.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <i
          className="fa-solid fa-table-columns fa-lg"
          style={{ color: "#6b7280" }} // Tailwind gray-500
        ></i>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.125rem",
            marginLeft: "0.75rem",
            color: "#6b7280", // Tailwind gray-500
            cursor: "pointer",
          }}
          onClick={handleTableClick}
        >
          {tableName} [+]
        </p>
      </div>
      {tableHead.map((row, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-end",
            position: "relative",
            marginLeft: "0.75rem",
            cursor: "pointer",
          }}
          onClick={() => handleColumnClick(row.field)}
        >
          <div
            style={{
              width: "1.5rem",
              height: "2rem",
              borderLeft: "2px solid black",
              borderBottom: "2px solid black",
            }}
          ></div>
          <p
            style={{
              color: "#6b7280", // Tailwind gray-500
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            {row.field}
            <span
              style={{
                color: "#93c5fd", // Tailwind blue-300
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.color = "#60a5fa")} // Tailwind blue-400 hover
              onMouseOut={(e) => (e.target.style.color = "#93c5fd")}
            >
              {" "}
              [{row.type}({row.fieldSize})]
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default TableStructure;
