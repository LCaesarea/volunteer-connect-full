// src/components/header.ts
import { updateLoginStatus } from "./auth";

// Initialize header when the document is ready
export function initHeader(): void {
    document.addEventListener("DOMContentLoaded", () => {
        updateLoginStatus(); // sets up navbar link text + visibility
    });
}

// Call initHeader to make sure it runs
initHeader();
