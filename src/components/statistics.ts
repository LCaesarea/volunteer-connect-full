// scripts/components/statistics.ts
import Chart from 'chart.js/auto';

export function renderStatisticsPage(): void {
    const canvas = document.getElementById('statsCanvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Event 1', 'Event 2', 'Event 3'],
            datasets: [{
                label: 'Participants',
                data: [30, 50, 75],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
