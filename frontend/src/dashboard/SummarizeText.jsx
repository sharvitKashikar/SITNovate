import React, { useState } from "react";
import "../../styles/SummarizeText.css";

const SummarizeText = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter text for summarization.");
      return;
    }

    setError(""); // Clear errors

    try {
      const response = await fetch("http://localhost:5000/summarize-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize text.");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError("Error summarizing text. Please try again.");
      console.error("Summarization error:", error);
    }
  };

  return (
    <div className="summarize-container">
      <h2>Summarize Text</h2>
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSummarize}>Summarize</button>
      {error && <p className="error-message">{error}</p>}
      {summary && <p className="summary-output">{summary}</p>}
    </div>
  );
};

export default SummarizeText;
