// Main function to load and display events
function loadEvents() {
    fetch('/events/api')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(events => {
            renderEvents(events);
        })
        .catch(error => {
            console.error("Failed to load events:", error);
            showError();
        });
}

// Helper function to render events
function renderEvents(events) {
    const container = document.getElementById('events-list');
    if (!container) return;

    container.innerHTML = events.map(event => `
        <div class="event-card">
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> ${event.location || "TBD"}</p>
            <p>${event.description}</p>
        </div>
    `).join('');
}

// Helper function to show error message
function showError() {
    const container = document.getElementById('events-list');
    if (container) {
        container.innerHTML = '<p class="error">Unable to load events at this time.</p>';
    }
}

export default loadEvents;