const BASE_URL = "http://127.0.0.1:8000/api"; // FastAPI Base URL

// 🟢 SIGNUP FUNCTION
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("new-email").value;
    const password = document.getElementById("new-password").value;

    const response = await fetch(`${BASE_URL}/signup`, {
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

    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.detail || "Login failed!");
        return;
    }

    alert("Login successful!");

    // Store token in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", email);
    window.location.href = "dashboard.html";  // Redirect to dashboard
});

// 🟢 CHECK AUTH & REDIRECT IF NOT LOGGED IN
function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }
}

// 🟢 FETCH USER HISTORY (Corrected)
async function fetchUserHistory() {
    const email = localStorage.getItem("email");
    if (!email) return;

    const response = await fetch(`${BASE_URL}/history?email=${email}`);
    const data = await response.json();

    const historyContainer = document.getElementById("history-container");
    historyContainer.innerHTML = ""; // Clear previous content

    if (data.history.length === 0) {
        historyContainer.innerHTML = `<div class="empty-card">No history available.</div>`;
        return;
    }

    data.history.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("history-card");

        card.innerHTML = `
            <p class="summary-text" id="summary-${index}">${item.summary}</p>
            <button class="see-more-btn" onclick="toggleSummary(${index})">See More</button>
        `;
        historyContainer.appendChild(card);
    });
}

// 🟢 Toggle Summary Text (Fixed)
function toggleSummary(index) {
    const summaryText = document.getElementById(`summary-${index}`);
    if (summaryText.classList.contains("expanded")) {
        summaryText.classList.remove("expanded");
    } else {
        summaryText.classList.add("expanded");
    }
}

// Call fetch history when the user lands on the dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchUserHistory();
}

// 🟢 LOGOUT FUNCTION
document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "login.html";
});

// Call fetch history when the user lands on the dashboard
if (window.location.pathname.includes("dashboard.html")) {
    fetchUserHistory();
}
