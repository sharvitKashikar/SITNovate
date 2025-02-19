import React from "react";
import "../styles/History.css";

const History = () => {
  const history = ["Sample summary 1", "Sample summary 2"];

  return (
    <div className="history-container">
      <h2>Summary History</h2>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
