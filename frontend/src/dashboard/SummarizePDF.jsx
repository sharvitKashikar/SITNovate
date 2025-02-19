import React, { useState } from "react";
import "../../styles/SummarizePDF.css";

const SummarizePDF = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setError(""); // Clear previous errors

    const formData = new FormData();
    formData.append("file", file); // ✅ Ensure key name is "file"

    try {
      const response = await fetch("http://localhost:5000/summarize-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to summarize PDF.");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="summarize-container">
      <h2>Summarize PDF</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Summarize</button>
      {error && <p className="error-message">{error}</p>}
      {summary && <p className="summary-output">{summary}</p>}
    </div>
  );
};

export default SummarizePDF;
