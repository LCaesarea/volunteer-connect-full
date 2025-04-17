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

    container.innerHTML = events.map(event =>
        `<div class="event-card" data-id="${event._id}">
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> ${event.location || "TBD"}</p>
            <p>${event.description}</p>
            <button class="btn btn-danger delete-btn">Delete</button>
        </div>`
    ).join('');

    attachDeleteListeners(); // Set up delete buttons after rendering
}

// Add click listeners to all delete buttons
function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const card = this.closest('.event-card');
            const eventId = card.getAttribute('data-id');

            if (confirm("Are you sure you want to delete this event?")) {
                try {
                    const res = await fetch(`/events/${eventId}`, {
                        method: 'DELETE'
                    });

                    if (res.ok) {
                        loadEvents(); // Refresh list
                    } else {
                        const text = await res.text();
                        alert("Failed to delete event: " + text);
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    alert("An error occurred while deleting the event.");
                }
            }
        });
    });
}

// Helper function to show error message
function showError() {
    const container = document.getElementById('events-list');
    if (container) {
        container.innerHTML = '<p class="error">Unable to load events at this time.</p>';
    }
}

export default loadEvents;
