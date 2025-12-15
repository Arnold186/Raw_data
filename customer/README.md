# NexusAnalytics - Customer Insights Dashboard

NexusAnalytics is a powerful, lightweight Customer Insights Dashboard designed to visualize customer data derived from CSV files. It transforms raw customer records into interactive charts and key metrics, helping businesses understand their demographics, regional distribution, and growth trends at a glance.

![Dashboard Preview](https://placehold.co/600x400?text=Dashboard+Preview)
*(Note: Replace with actual screenshot if available)*

## 🚀 Key Features

*   **Automated Data Processing**: Cleans and normalizes raw CSV data (handling missing values, inconsistent casing, and date formats).
*   **Interactive Visualization**: Uses **Chart.js** to render dynamic line, bar, doughnut, and pie charts.
*   **Key Metrics Display**: Instantly highlights total customers, top-performing regions, and loyalty tier distribution.
*   **Modern UI/UX**: Built with a "dark mode" aesthetic, using the **Outfit** font family and **Phosphor Icons** for a premium look and feel.
*   **Responsive Design**: Fully responsive layout that adapts to different screen sizes.

## 🛠️ Tech Stack

This project leverages a simple yet robust stack:

### Backend / Data Processing
*   **Python 3.x**: The core engine for reading, cleaning, and aggregating data.
    *   `csv` & `json`: Native libraries for data handling.
    *   `collections`: For efficient counting and aggregation.
    *   `datetime`: For parsing and formatting dates.
    *   `http.server`: For serving the visualization locally.

### Frontend
*   **HTML5**: Semantic structure.
*   **CSS3**: Custom styling variables, flexbox/grid layouts, and responsive media queries.
*   **JavaScript (ES6+)**: Async data fetching and DOM manipulation.
*   **Chart.js**: Third-party library for responsive charts.
*   **Phosphor Icons**: Lightweight, flexible icon family.

## 📂 Project Structure

```text
customer/
├── customer_info.csv    # Raw input data (required)
├── process_data.py      # Main script: processes data & starts server
├── data.json            # Generated processed data (output)
├── index.html           # Dashboard structure
├── style.css            # Styling and layout
├── script.js            # Frontend logic & chart initialization
└── README.md            # Project documentation
```

### Key Files Described

*   **`process_data.py`**:
    *   Reads `customer_info.csv`.
    *   Normalizes fields like `gender` (e.g., 'm' -> 'Male'), `tier`, and `region`.
    *   Aggregates stats (gender distribution, signups over time, etc.).
    *   Exports clean data to `data.json`.
    *   Starts a local HTTP server on port 8000.

*   **`script.js`**:
    *   Fetches `data.json` asynchronously.
    *   Updates the DOM with top-level metrics.
    *   Configures and renders 4 distinct charts using `Chart.js`.

*   **`style.css`**:
    *   Defines the color palette (Dark distinct colors).
    *   Implements the card-based layout and animations.

## 🏁 Getting Started

### Prerequisites

*   **Python 3.7+** installed on your machine.
*   A modern web browser (Chrome, Firefox, Edge).

### Installation

1.  **Clone or Download** this repository to your local machine.
2.  Ensure you have your source data file named `customer_info.csv` in the root directory.

### Running the Dashboard

1.  Open your terminal or command prompt.
2.  Navigate to the project directory:
    ```bash
    cd path/to/customer
    ```
3.  Run the processing script:
    ```bash
    python process_data.py
    ```
4.  You will see output indicating data processing is complete, followed by the server address:
    ```text
    Processed 1500 records.
    ...
    Data saved to data.json
    Processing complete! Visualization is ready.
    Go to: http://localhost:8000
    ```
5.  Open your browser and navigate to **`http://localhost:8000`**.

## 🤝 Contributing

Feel free to fork this project and submit pull requests. Common improvements include:
*   Adding more detailed charts (e.g., Age distribution).
*   Implementing a backend API (Flask/FastAPI) for real-time data updates.
*   Adding export functionality for the charts.
