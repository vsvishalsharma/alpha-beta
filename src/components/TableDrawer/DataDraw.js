import React from "react";
import TableStructure from "./TableStructure";
import data from "../../DataStore/data.json";

function DataDraw() {
  const tableNames = Object.keys(data);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.125rem",
          color: "#3b82f6", // Tailwind blue-500
          padding: "0.5rem 0",
        }}
      >
        Tables
        <div>
        Click to move to editor ➡️
        </div>
      </div>
      <div
        style={{
          width: "66.67%",
          borderBottom: "2px solid black",
          margin: "0 auto 1rem auto",
        }}
      ></div>
      <div style={{ overflow: "auto", height: "100%" }}>
        {tableNames.map((tableName, index) => (
          <React.Fragment key={index}>
            <TableStructure
              tableHead={data[tableName].headers}
              tableName={tableName}
              tableNo={index + 1}
            />
            {index < tableNames.length - 1 && (
              <div
                style={{
                  width: "66.67%",
                  borderBottom: "2px solid black",
                  margin: "2rem auto",
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DataDraw;
