import { initRouter } from "./router";
import { initGallery } from "./components/gallery";  // Import gallery initialization
import { initAuth } from "./components/auth";        // Import authentication initialization

document.addEventListener("DOMContentLoaded", () => {
    highlightActivePage();
    updateLoginStatus();
    displayLoginStatus();
    initializeDarkMode();
    initializeSearch();
    initRouter(); // Start SPA routing
    setupBackToTopButton();
    setupDarkModeToggle();

    // Initialize Gallery and Auth components
    if (document.getElementById("gallery")) {
        initGallery(); // Initialize gallery if the element exists
    }
    if (document.getElementById("loginForm")) {
        initAuth(); // Initialize authentication logic if the login form exists
    }
});

function highlightActivePage(): void {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

function setupBackToTopButton(): void {
    const button = document.createElement("button");
    button.textContent = "Back to Top";
    button.id = "backToTopBtn";
    document.body.appendChild(button);

    window.addEventListener("scroll", () => {
        button.style.display = window.scrollY > 100 ? "block" : "none";
    });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function setupDarkModeToggle(): void {
    const button = document.createElement("button");
    button.id = "darkModeToggle";
    button.setAttribute("aria-label", "Toggle Dark Mode");
    document.body.appendChild(button);

    button.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark.toString());
        button.textContent = isDark ? "☀️" : "🌙";
    });
}

function initializeDarkMode(): void {
    const button = document.getElementById("darkModeToggle")!;
    const isDark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", isDark);
    button.textContent = isDark ? "☀️" : "🌙";
}

function initializeSearch(): void {
    const form = document.getElementById("searchForm") as HTMLFormElement;
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
        const resultsContainer = document.getElementById("searchResults")!;
        resultsContainer.innerHTML = "";

        const data = [
            { type: "event", title: "Community Cleanup", description: "Help clean up local parks.", date: "2023-11-15" },
            { type: "event", title: "Food Drive", description: "Distribute food to those in need.", date: "2023-11-20" },
            { type: "news", title: "Local Park Renovation", description: "The city plans renovations.", date: "2023-11-10" },
        ];

        const results = data.filter(item =>
            item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
        );

        if (results.length) {
            results.forEach(result => {
                resultsContainer.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${result.title}</h5>
                            <p class="card-text">${result.description}</p>
                            <p class="card-text"><small class="text-muted">${result.date}</small></p>
                        </div>
                    </div>`;
            });
        } else {
            resultsContainer.innerHTML = `<div class="alert alert-warning">No results found for "${query}".</div>`;
        }
    });
}

function updateLoginStatus(): void {
    const loginLogoutLink = document.getElementById("login-logout-link") as HTMLAnchorElement;
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        loginLogoutLink.textContent = "Log Out";
        loginLogoutLink.href = "#";
        loginLogoutLink.onclick = (e) => {
            e.preventDefault();
            localStorage.setItem("loggedIn", "false");
            alert("You have been logged out.");
            location.href = "index.html";
        };
    } else {
        loginLogoutLink.textContent = "Log In";
        loginLogoutLink.href = "login.ejs";
    }
}

function displayLoginStatus(): void {
    const statusEl = document.getElementById("login-status");
    if (!statusEl) return;

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    statusEl.textContent = isLoggedIn ? "Welcome, User!" : "Please log in to access more features.";
}
