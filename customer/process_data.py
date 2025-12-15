import csv
import json
import collections
from datetime import datetime

INPUT_FILE = 'customer_info.csv'
OUTPUT_FILE = 'data.json'

def normalize_gender(gender):
    if not gender:
        return 'Unknown'
    g = gender.strip().lower()
    if g in ['male', 'm']:
        return 'Male'
    if g in ['female', 'femle', 'f']:
        return 'Female'
    return 'Other'

def normalize_tier(tier):
    if not tier:
        return 'Unknown'
    t = tier.strip().lower()
    if 'gold' in t or 'gld' in t:
        return 'Gold'
    if 'silver' in t or 'sllver' in t:
        return 'Silver'
    if 'bronze' in t or 'brnze' in t:
        return 'Bronze'
    return t.capitalize()

def normalize_region(region):
    if not region:
        return 'Unknown'
    return region.strip()

def process_date(date_str):
    if not date_str:
        return None
    try:
        # Assuming format DD-MM-YY based on file inspection (e.g., 26-04-25)
        return datetime.strptime(date_str.strip(), '%d-%m-%y')
    except ValueError:
        return None

def main():
    data = {
        'gender_distribution': collections.Counter(),
        'region_distribution': collections.Counter(),
        'loyalty_distribution': collections.Counter(),
        'signups_over_time': collections.Counter(), # YYYY-MM
        'total_customers': 0
    }

    with open(INPUT_FILE, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data['total_customers'] += 1
            
            # Normalize
            gender = normalize_gender(row.get('gender'))
            tier = normalize_tier(row.get('loyalty_tier'))
            region = normalize_region(row.get('region'))
            
            signup_date = process_date(row.get('signup_date'))
            
            # Aggregate
            data['gender_distribution'][gender] += 1
            data['region_distribution'][region] += 1
            data['loyalty_distribution'][tier] += 1
            
            if signup_date:
                month_key = signup_date.strftime('%Y-%m')
                data['signups_over_time'][month_key] += 1

    # Convert Counters to dicts and sort time series
    output_data = {
        'total_customers': data['total_customers'],
        'gender': dict(data['gender_distribution']),
        'region': dict(data['region_distribution']),
        'loyalty': dict(data['loyalty_distribution']),
        'signups': dict(sorted(data['signups_over_time'].items()))
    }
    
    # Print stats for verification
    print(f"Processed {data['total_customers']} records.")
    print("Gender stats:", output_data['gender'])
    print("Loyalty stats:", output_data['loyalty'])

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2)
    print(f"Data saved to {OUTPUT_FILE}")

    serve_files()

def serve_files():
    import http.server
    import socketserver
    
    PORT = 8000
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Allow address reuse in case we restart quickly
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"\nProcessing complete! Visualization is ready.")
            print(f"Go to: http://localhost:{PORT}")
            print("Press Ctrl+C to stop the server.")
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98 or e.errno == 48: # Address already in use
             print(f"\nError: Port {PORT} is already in use. Please stop other servers or choose a different port.")
        else:
             raise

if __name__ == "__main__":
    main()
