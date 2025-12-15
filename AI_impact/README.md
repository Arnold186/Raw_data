# AI Impact on Jobs 2030

![Project Status](https://img.shields.io/badge/status-active-success)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/flask-2.0%2B-green)

## 📊 Overview

**AI Impact on Jobs 2030** is an interactive data visualization dashboard designed to analyze and project the potential effects of Artificial Intelligence on the global workforce by the year 2030. 

This project ingests complex raw data regarding job titles, education levels, AI exposure indices, and automation probabilities, transforming it into intuitive, actionable insights through a modern web interface.

## 🏗️ Infrastructure & Technologies

This application is built using a robust and lightweight stack, ensuring performance and ease of deployment.

### Backend
- **Python**: Core programming language for data processing and server logic.
- **Flask**: A lightweight WSGI web application framework used to serve the application and provide API endpoints.
- **Pandas**: Powerful data manipulation and analysis library used to read and process the CSV dataset.

### Frontend
- **HTML5 & CSS3**: Semantic structure and modern styling using Flexbox/Grid and CSS variables for a responsive design.
- **JavaScript (ES6+)**: Vanilla JavaScript for DOM manipulation and state management.
- **Plotly.js**: A high-level, declarative charting library used for rendering interactive and dynamic visualizations.
- **Google Fonts**: Utilizes 'Outfit' and 'Space Grotesk' for a clean, modern typography.

## 📂 Project Structure

```bash
AI_impact/
├── app.py                      # Main application entry point (Flask server)
├── AI_Impact_on_Jobs_2030.csv  # Raw dataset
├── verify_server.py            # Utility script for server verification
├── static/                     # Static assets served by Flask
│   ├── index.html              # Main dashboard interface
│   ├── script.js               # Frontend logic and chart updates
│   └── style.css               # Application styling
└── README.md                   # Project documentation
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have **Python 3.x** installed on your system.

### Installation

1.  **Clone the repository** (or navigate to the project directory):
    ```bash
    cd path/to/AI_impact
    ```

2.  **Install the required Python packages**:
    ```bash
    pip install flask pandas
    ```

### Usage

1.  **Start the Flask server**:
    ```bash
    python app.py
    ```

2.  **Access the Dashboard**:
    Open your web browser and navigate to:
    `http://localhost:5000`

## 🌟 Features

-   **Interactive Dashboard**: Filter data dynamically by Job Title and Education Level.
-   **Key Performance Indicators (KPIs)**: clear metrics for 'Total Jobs Analyzed' and 'Average AI Exposure'.
-   **Rich Visualizations**:
    -   **Scatter Analysis**: Correlate AI Exposure with Average Salary and Automation Probability.
    -   **Bar Charts**: View Automation Probability breakdown by job.
    -   **Risk Distribution**: Pie charts showing the distribution of High, Medium, and Low risk categories.
    -   **Tech Growth**: Analyze the relationship between Years of Experience and Tech Growth Factors.
-   **Responsive Design**: Optimized for various screen sizes with a dark-themed, futuristic aesthetic.

## 📈 Data Source

The application relies on `AI_Impact_on_Jobs_2030.csv`, which contains predictive data points for various industries, including:
-   `Job_Title`
-   `AI_Exposure_Index`
-   `Automation_Probability_2030`
-   `Average_Salary`
-   `Risk_Category`
