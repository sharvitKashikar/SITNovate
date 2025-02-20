const BASE_URL = "http://127.0.0.1:8000/api"; // FastAPI Base URL

// 🟢 SIGNUP FUNCTION
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("new-email").value;
    const password = document.getElementById("new-password").value;

    const response = await fetch(`${BASE_URL}/signup`, {  // ✅ Corrected Endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message || "Signup successful!");

    if (response.ok) {
        window.location.href = "login.html"; // Redirect to login page
    }
});

// 🟢 LOGIN FUNCTION
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
        localStorage.setItem("token", data.token);  // Store token
        localStorage.setItem("email", email);  // Store user email
        window.location.href = "dashboard.html";  // Redirect to dashboard
    }
});


// 🟢 FETCH USER HISTORY
async function fetchUserHistory() {
    const email = localStorage.getItem("email");
    if (!email) return;

    const response = await fetch(`${BASE_URL}/auth/history/${email}`);
    const data = await response.json();

    const historyContainer = document.getElementById("history-container");
    historyContainer.innerHTML = ""; // Clear previous content

    if (data.history.length === 0) {
        historyContainer.innerHTML = `<div class="empty-card">No history available.</div>`;
        return;
    }

    data.history.forEach(item => {
        const entry = document.createElement("div");
        entry.classList.add("history-card");
        entry.innerHTML = `
            <p>${item.summary}</p>
            <span>${new Date(item.timestamp).toLocaleString()}</span>
        `;
        historyContainer.appendChild(entry);
    });
}

// Call fetch history when the user lands on the dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchUserHistory();
}

// 🟢 LOGOUT FUNCTION
document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("email");
    window.location.href = "login.html";
});

// Call fetch history when the user lands on the dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchUserHistory();
}
