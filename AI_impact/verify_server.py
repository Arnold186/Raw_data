import urllib.request
import json

try:
    print("Checking Root...")
    with urllib.request.urlopen("http://localhost:5000") as response:
        print(f"Root status: {response.getcode()}")
    
    print("Checking API...")
    with urllib.request.urlopen("http://localhost:5000/api/data") as response:
        print(f"API status: {response.getcode()}")
        data = json.load(response)
        print(f"Data length: {len(data)}")
        if len(data) > 0:
            print("First item sample:", list(data[0].keys()))

except Exception as e:
    print(f"Error: {e}")
