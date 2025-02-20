const BASE_URL = "http://127.0.0.1:8000/api"; // Ensure backend URL is correct

/**
 * 🟢 Summarize PDF (with loading animation)
 */
document.getElementById("upload-btn")?.addEventListener("click", async () => {
    const fileInput = document.getElementById("file-input");
    const summaryOutput = document.getElementById("summary-container");
    const loadingSpinner = document.getElementById("loading");

    if (!fileInput.files.length) {
        alert("Please select a PDF file first!");
        return;
    }

    // Show Loading Animation
    loadingSpinner.style.display = "block";
    summaryOutput.style.display = "none";

    const email = localStorage.getItem("email"); // Get logged-in user email
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
        const response = await fetch(`${BASE_URL}/summarize-pdf?email=${email}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to summarize PDF");
        }

        const data = await response.json();
        summaryOutput.innerHTML = `<p>${data.summary}</p>`; // Display Summary
        summaryOutput.classList.add("show");
    } catch (error) {
        console.error("Error summarizing PDF:", error);
        summaryOutput.innerHTML = "<p style='color: red;'>Error summarizing PDF.</p>";
    } finally {
        // Hide Loading Animation
        loadingSpinner.style.display = "none";
        summaryOutput.style.display = "block";
    }
});

/**
 * 🟢 Summarize Text
 */
document.getElementById("summarize-text-btn")?.addEventListener("click", async () => {
    const textInput = document.getElementById("text-input");
    const summaryOutput = document.getElementById("summary-container");
    const loadingSpinner = document.getElementById("loading");

    if (!textInput.value.trim()) {
        alert("Please enter some text to summarize!");
        return;
    }

    // Show Loading Animation
    loadingSpinner.style.display = "block";
    summaryOutput.style.display = "none";

    const email = localStorage.getItem("email");
    const text = textInput.value;

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
        summaryOutput.innerHTML = `<p>${data.summary}</p>`; // Display Summary
        summaryOutput.classList.add("show");
    } catch (error) {
        console.error("Error summarizing text:", error);
        summaryOutput.innerHTML = "<p style='color: red;'>Error summarizing text.</p>";
    } finally {
        // Hide Loading Animation
        loadingSpinner.style.display = "none";
        summaryOutput.style.display = "block";
    }
});
