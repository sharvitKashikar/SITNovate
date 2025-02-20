const BASE_URL = "http://localhost:5000/api"; // Ensure backend URL is correct

/**
 * Summarizes a given text by sending a request to the backend.
 * @param {string} email - The user's email.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} - The summarized text from the backend.
 */
export const summarizeText = async (email, text) => {
    try {
        const response = await fetch(`${BASE_URL}/summarize-text`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, text }),
        });

        if (!response.ok) {
            throw new Error("Failed to summarize text");
        }

        const data = await response.json();
        return data.summary;
    } catch (error) {
        console.error("Error summarizing text:", error);
        return "Error summarizing text.";
    }
};

/**
 * Uploads a PDF file for summarization.
 * @param {string} email - The user's email.
 * @param {File} file - The PDF file to summarize.
 * @returns {Promise<string>} - The summarized content from the backend.
 */
export const summarizePDF = async (email, file) => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("pdf", file);

        const response = await fetch(`${BASE_URL}/summarize-pdf?email=${email}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to summarize PDF");
        }

        const data = await response.json();
        return data.summary;
    } catch (error) {
        console.error("Error summarizing PDF:", error);
        return "Error summarizing PDF.";
    }
};

/**
 * Fetches the user's summary history.
 * @param {string} email - The user's email.
 * @returns {Promise<Array>} - List of past summaries.
 */
export const getSummaryHistory = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/history/${email}`);

        if (!response.ok) {
            throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        return data.history;
    } catch (error) {
        console.error("Error fetching history:", error);
        return [];
    }
};
