// scripts/components/auth.ts
// Auth component for login functionality and personalized messages

export function initAuth(): void {
    const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;

    if (!loginForm) return;

    loginForm.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        const usernameInput = document.getElementById("username") as HTMLInputElement | null;
        const passwordInput = document.getElementById("password") as HTMLInputElement | null;

        if (!usernameInput || !passwordInput) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simulated login logic — replace with real API call later
        if (username === "Ackeem" && password === "Password") {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);
            alert(`Welcome back, ${username}!`);
            window.location.href = "/";
        } else {
            alert("Invalid username or password.");
        }
    });
}

export function updateLoginStatus(): void {
    const loginLogoutLink = document.getElementById("login-logout-link") as HTMLAnchorElement;
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const username = localStorage.getItem("username") || "User";

    if (isLoggedIn) {
        loginLogoutLink.textContent = "Log Out";
        loginLogoutLink.href = "#";
        loginLogoutLink.onclick = (e) => {
            e.preventDefault();
            localStorage.setItem("loggedIn", "false");
            localStorage.removeItem("username");
            alert("You have been logged out.");
            location.href = "/";
        };
    } else {
        loginLogoutLink.textContent = "Log In";
        loginLogoutLink.href = "login.ejs";
        loginLogoutLink.onclick = null;
    }

    const greetingEl = document.getElementById("greeting");
    const statusEl = document.getElementById("login-status");

    if (greetingEl) {
        greetingEl.textContent = isLoggedIn ? `Welcome, ${username}!` : "";
    }

    if (statusEl) {
        statusEl.textContent = isLoggedIn
            ? `Hello, ${username}! You're logged in.`
            : "Please log in to access more features.";
    }


    document.querySelectorAll(".auth-only").forEach(el => {
        (el as HTMLElement).style.display = isLoggedIn ? "block" : "none";
    });

    document.querySelectorAll(".guest-only").forEach(el => {
        (el as HTMLElement).style.display = isLoggedIn ? "none" : "block";
    });
}

