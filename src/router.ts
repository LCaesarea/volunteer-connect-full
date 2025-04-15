import { renderStatisticsPage } from "./components/statistics";
import { initEventPlanningPage } from "./components/event-planning";
import { loadEvents } from "./components/events";
import { updateLoginStatus } from "./components/auth";
import { loadNews } from "./views/news";

let navbarLoaded = false;

export function initRouter(): void {
    window.addEventListener("popstate", handleRouting);
    loadNavbar(); // load once on init
    handleRouting(); // initial load
}

function loadNavbar(): void {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer && !navbarLoaded) {
        navbarLoaded = true;

        navbarContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/" data-path="/">Volunteer Connect</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="/" data-path="/">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="/events" data-path="/events">Events</a></li>
                        <li class="nav-item auth-only"><a class="nav-link" href="/statistics" data-path="/statistics">Statistics</a></li>
                        <li class="nav-item auth-only"><a class="nav-link" href="/event-planning" data-path="/event-planning">Event Planning</a></li>
                        <li class="nav-item"><a class="nav-link" href="/privacy" data-path="/privacy">Privacy Policy</a></li>
                        <li class="nav-item"><a class="nav-link" href="/terms" data-path="/terms">Terms of Service</a></li>
                        <li class="nav-item"><a class="nav-link" href="/donate" data-path="/donate">Donate</a></li>
                        <li class="nav-item"><a class="nav-link" id="login-logout-link" href="#" data-path="/login">Login</a></li>
                    </ul>
                </div>
            </nav>
        `;

        // Attach event listeners to internal links
        const links = navbarContainer.querySelectorAll('a[data-path]');
        links.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const path = (e.currentTarget as HTMLAnchorElement).getAttribute('data-path');
                if (path) {
                    navigateTo(path);
                }
            });
        });

        updateLoginStatus();
    }
}

function handleRouting(): void {
    const path = window.location.pathname;
    const app = document.getElementById("app");
    if (!app) return;

    let view = "home";
    if (path.includes("statistics")) view = "statistics";
    else if (path.includes("event-planning")) view = "event-planning";
    else if (path.includes("privacy")) view = "privacy";
    else if (path.includes("terms")) view = "terms";
    else if (path.includes("donate")) view = "donate";
    else if (path.includes("events")) view = "events";
    else if (path.includes("login")) view = "login";

    fetch(`views/${view}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Page not found");
            return res.text();
        })
        .then(html => {
            app.innerHTML = html;

            // Page-specific scripts
            if (view === "statistics") renderStatisticsPage();
            else if (view === "event-planning") initEventPlanningPage();
            else if (view === "events") loadEvents();
            else if (view === "home") loadNews("news-container");
        })
        .catch(() => {
            fetch("views/404.html")
                .then(res => res.ok ? res.text() : Promise.reject())
                .then(html => {
                    app.innerHTML = html;
                })
                .catch(() => {
                    app.innerHTML = `<h2>404 - Page not found</h2><p>The page you're looking for doesn't exist.</p>`;
                });
        });
}

function navigateTo(path: string): void {
    history.pushState(null, '', path);
    handleRouting();
}
