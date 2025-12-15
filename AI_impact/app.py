from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__, static_url_path='', static_folder='static')

# Path to the data file
DATA_FILE = 'AI_Impact_on_Jobs_2030.csv'

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/api/data')
def get_data():
    if not os.path.exists(DATA_FILE):
        return jsonify({"error": "Data file not found"}), 404
    
    try:
        df = pd.read_csv(DATA_FILE)
        # Convert to dictionary layout: {column -> [values]} or "records": [{col: val}, ...]
        # "records" is usually easier for frontend to consume row-by-row
        data = df.to_dict(orient='records')
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
