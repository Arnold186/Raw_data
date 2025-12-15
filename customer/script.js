document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Update Metrics
        document.querySelector('#total-customers-card .metric-value').textContent = data.total_customers.toLocaleString();
        
        // Find top region
        const textRegion = Object.keys(data.region).reduce((a, b) => data.region[a] > data.region[b] ? a : b);
        document.getElementById('top-region').textContent = textRegion;

        // Chart.js Global Defaults for Dark Mode
        Chart.defaults.color = '#a0a0a0';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
        Chart.defaults.font.family = "'Outfit', sans-serif";

        // 1. Growth Chart (Line)
        new Chart(document.getElementById('growthChart'), {
            type: 'line',
            data: {
                labels: Object.keys(data.signups),
                datasets: [{
                    label: 'New Signups',
                    data: Object.values(data.signups),
                    borderColor: '#00f2fe',
                    backgroundColor: 'rgba(0, 242, 254, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });

        // 2. Gender Distribution (Doughnut)
        new Chart(document.getElementById('genderChart'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(data.gender),
                datasets: [{
                    data: Object.values(data.gender),
                    backgroundColor: [
                        '#4facfe',
                        '#00f2fe',
                        '#f093fb',
                        '#667eea'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 6 } }
                }
            }
        });

        // 3. Regional Distribution (Bar)
        new Chart(document.getElementById('regionChart'), {
            type: 'bar',
            data: {
                labels: Object.keys(data.region),
                datasets: [{
                    label: 'Customers',
                    data: Object.values(data.region),
                    backgroundColor: '#4facfe',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });

        // 4. Loyalty Breakdown (Pie)
        new Chart(document.getElementById('loyaltyChart'), {
            type: 'pie',
            data: {
                labels: Object.keys(data.loyalty),
                datasets: [{
                    data: Object.values(data.loyalty),
                    backgroundColor: [
                        '#FFD700', // Gold
                        '#C0C0C0', // Silver
                        '#CD7F32', // Bronze
                        '#555555'  // Other
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 6 } }
                }
            }
        });

    } catch (error) {
        console.error("Error loading data:", error);
    }
});
