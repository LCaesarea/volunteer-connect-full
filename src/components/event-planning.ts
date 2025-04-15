// scripts/components/event-planning.ts
export function initEventPlanningPage(): void {
    const form = document.getElementById("eventForm") as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        const eventName = (document.getElementById("eventName") as HTMLInputElement).value;
        const eventDate = (document.getElementById("eventDate") as HTMLInputElement).value;

        if (!eventName || !eventDate) {
            alert("Please fill in all fields!");
            return;
        }

        const eventData = { name: eventName, date: eventDate };
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(eventData);
        localStorage.setItem("events", JSON.stringify(events));

        alert("Event saved!");
        form.reset();
    });
}
