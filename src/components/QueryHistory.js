import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setValue,
  setDefaults,
} from "../slices/querySlice";

function QueryHistory() {
  const dispatch = useDispatch();
  const queryHistory = useSelector((state) => state.query.queryHistory);
  const globalDefaults = useSelector((state) => state.query.defaults);
  const [localDefaults, setLocalDefaults] = useState(globalDefaults);

  useEffect(() => {
    setLocalDefaults(globalDefaults);
  }, [globalDefaults]);

  const handleQueryClick = (item) => {
    dispatch(setDefaults(item.default));
    dispatch(setValue(item.query));
  };

  return (
    <div style={{ color: "#3b82f6" }}>
      <div style={{ width: "100%", textAlign: "center", padding: "0.5rem 0" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.125rem" }}>Query History
        <div>
        Click to move to editor ⬅️
        </div>
        </div>
        <div style={{ width: "66.67%", borderBottom: "2px solid black", margin: "0 auto 0.5rem" }}></div>
      </div>

      <div
        style={{
          height: "15rem",
          overflow: "auto",
          marginBottom: "1.5rem",
          padding: "0 1rem",
        }}
      >
        {queryHistory.map((item, index) => (
          <p
            key={index}
            style={{
              cursor: "pointer",
              backgroundColor: "#f3f4f6",
              padding: "0.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              borderRadius: "0.5rem",
              margin: "1rem 0",
              transition: "background 0.3s, color 0.3s",
            }}
            onClick={() => handleQueryClick(item)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#9ca3af";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#f3f4f6";
              e.target.style.color = "#000";
            }}
          >
            {item.query}
          </p>
        ))}
      </div>
    </div>
  );
}

export default QueryHistory;
