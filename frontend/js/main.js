document.addEventListener("DOMContentLoaded", function () {
    particlesJS.load('particles-js', 'js/particles-config.json', function() {
        console.log('Particles.js loaded successfully');
    });
    console.log("🚀 Website Loaded Successfully!");

    const BASE_URL = "http://127.0.0.1:8000/api"; // 🔥 Backend API URL

    // ✅ Navbar Toggle for Mobile
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    // ✅ Smooth Scroll for Navbar Links
    document.querySelectorAll("nav a[href^='#']").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        });
    });

    // ✅ Logout Function (Clear Session and Redirect)
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("userEmail");
            window.location.href = "login.html";
        });
    }

    // ✅ Redirect Users if Not Logged In (For Protected Pages)
    const protectedPages = ["dashboard.html", "summarize-text.html", "summarize-pdf.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            window.location.href = "login.html"; // Redirect if not logged in
        } else {
            loadUserHistory(userEmail); // Load user's summarization history from DB
        }
    }

    // ✅ Signup Function
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("new-email").value;
            const password = document.getElementById("new-password").value;

            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userEmail", email);
                alert("✅ Signup successful!");
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert(`❌ Error: ${data.detail}`);
            }
        });
    }

    // ✅ Login Function
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userEmail", email);
                alert("✅ Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(`❌ Error: ${data.detail}`);
            }
        });
    }

    // ✅ Load User History from MongoDB
    async function loadUserHistory(email) {
        const historySection = document.querySelector(".dashboard-content");

        try {
            const response = await fetch(`${BASE_URL}/history?email=${email}`);
            const data = await response.json();

            if (response.ok) {
                let historyHTML = "<h2>Your Summary History</h2><ul>";

                data.history.forEach((entry) => {
                    historyHTML += `<li><strong>Original:</strong> ${entry.original_text}<br>
                                    <strong>Summary:</strong> ${entry.summary}</li>`;
                });

                historyHTML += "</ul>";
                historySection.innerHTML += historyHTML;
            } else {
                historySection.innerHTML += `<p>No history found.</p>`;
            }
        } catch (error) {
            console.error("Error loading history:", error);
            historySection.innerHTML += `<p>Error loading history.</p>`;
        }
    }
    
});
