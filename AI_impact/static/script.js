// Global data storage
let rawData = [];

// DOM Elements
const jobSelect = document.getElementById('job-title-filter');
const educationSelect = document.getElementById('education-filter');
const totalJobsElement = document.getElementById('total-jobs');
const avgExposureElement = document.getElementById('avg-exposure');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    jobSelect.addEventListener('change', updateCharts);
    educationSelect.addEventListener('change', updateCharts);
});

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        if (data.error) {
            console.error(data.error);
            alert('Error loading data');
            return;
        }

        rawData = data;
        populateFilters();
        updateCharts();
    } catch (error) {
        console.error('Error:', error);
    }
}

function populateFilters() {
    // Unique Job Titles
    const jobs = [...new Set(rawData.map(d => d.Job_Title))].sort();
    jobs.forEach(job => {
        const option = document.createElement('option');
        option.value = job;
        option.textContent = job;
        jobSelect.appendChild(option);
    });

    // Unique Education Levels
    const eduLevels = [...new Set(rawData.map(d => d.Education_Level))].sort();
    eduLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        educationSelect.appendChild(option);
    });
}

function updateCharts() {
    const selectedJob = jobSelect.value;
    const selectedEdu = educationSelect.value;

    let filteredData = rawData;

    if (selectedJob !== 'all') {
        filteredData = filteredData.filter(d => d.Job_Title === selectedJob);
    }

    if (selectedEdu !== 'all') {
        filteredData = filteredData.filter(d => d.Education_Level === selectedEdu);
    }

    updateKPIs(filteredData);
    renderScatterPlot(filteredData);
    renderBarChart(filteredData);
    renderPieChart(filteredData);
    renderTechChart(filteredData);
}

function updateKPIs(data) {
    totalJobsElement.textContent = data.length;
    
    if (data.length === 0) {
        avgExposureElement.textContent = "0";
        return;
    }

    const totalExposure = data.reduce((sum, d) => sum + d.AI_Exposure_Index, 0);
    const avg = (totalExposure / data.length).toFixed(2);
    avgExposureElement.textContent = avg;
}

// Chart Configurations
const commonLayout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
        color: '#e2e8f0',
        family: 'Outfit, sans-serif'
    },
    margin: { t: 30, r: 20, l: 40, b: 40 },
    xaxis: { gridcolor: '#334155' },
    yaxis: { gridcolor: '#334155' }
};

function renderScatterPlot(data) {
    const trace = {
        x: data.map(d => d.AI_Exposure_Index),
        y: data.map(d => d.Average_Salary),
        mode: 'markers',
        type: 'scatter',
        text: data.map(d => `${d.Job_Title}<br>${d.Education_Level}`),
        marker: {
            size: 8,
            color: data.map(d => d.Automation_Probability_2030),
            colorscale: 'Viridis',
            showscale: true,
            colorbar: { title: 'Auto Prob' }
        }
    };

    const layout = {
        ...commonLayout,
        xaxis: { ...commonLayout.xaxis, title: 'AI Exposure Index' },
        yaxis: { ...commonLayout.yaxis, title: 'Average Salary' }
    };

    Plotly.newPlot('scatter-plot', [trace], layout, { responsive: true, displayModeBar: false });
}

function renderBarChart(data) {
    // Group by Job Title and avg Automation Probability
    const jobStats = {};
    data.forEach(d => {
        if (!jobStats[d.Job_Title]) {
            jobStats[d.Job_Title] = { total: 0, count: 0 };
        }
        jobStats[d.Job_Title].total += d.Automation_Probability_2030;
        jobStats[d.Job_Title].count += 1;
    });

    const labels = Object.keys(jobStats);
    const values = labels.map(job => (jobStats[job].total / jobStats[job].count));

    const trace = {
        x: labels,
        y: values,
        type: 'bar',
        marker: {
            color: '#10b981'
        }
    };

    const layout = {
        ...commonLayout,
        yaxis: { ...commonLayout.yaxis, title: 'Avg Automation Prob' }
    };

    Plotly.newPlot('bar-chart', [trace], layout, { responsive: true, displayModeBar: false });
}

function renderPieChart(data) {
    const counts = {};
    data.forEach(d => {
        counts[d.Risk_Category] = (counts[d.Risk_Category] || 0) + 1;
    });

    const trace = {
        labels: Object.keys(counts),
        values: Object.values(counts),
        type: 'pie',
        hole: 0.4,
        textinfo: 'label+percent',
        marker: {
            colors: ['#ef4444', '#f59e0b', '#10b981'] // Custom colors roughly mapping to High, Med, Low
        }
    };

    const layout = {
        ...commonLayout,
        showlegend: true
    };

    Plotly.newPlot('pie-chart', [trace], layout, { responsive: true, displayModeBar: false });
}

function renderTechChart(data) {
     const trace = {
        x: data.map(d => d.Years_Experience),
        y: data.map(d => d.Tech_Growth_Factor),
        mode: 'markers',
        type: 'scatter',
        marker: {
             color: '#3b82f6',
             size: 6
        }
    };
    
    const layout = {
        ...commonLayout,
        xaxis: { ...commonLayout.xaxis, title: 'Years Experience' },
        yaxis: { ...commonLayout.yaxis, title: 'Tech Growth Factor' }
    };
    
    Plotly.newPlot('tech-growth-chart', [trace], layout, { responsive: true, displayModeBar: false });
}
