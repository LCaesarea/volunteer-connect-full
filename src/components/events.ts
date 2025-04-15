export function loadEvents(): void {
    fetch("/api/events") // Changed from static JSON to API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((events: EventItem[]) => {
            const container = document.getElementById("events-list");
            if (!container) return;

            container.innerHTML = events.map(event => `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> ${event.location || "TBD"}</p>
                    <p>${event.description}</p>
                </div>
            `).join("");
        })
        .catch(error => {
            console.error("Failed to load events:", error);
            const container = document.getElementById("events-list");
            if (container) {
                container.innerHTML = `<p class="error">Unable to load events at this time.</p>`;
            }
        });
}

// Interface to reflect MongoDB Event model (as returned from API)
interface EventItem {
    _id: string;
    title: string;
    date: string;
    description: string;
    location?: string;
}

