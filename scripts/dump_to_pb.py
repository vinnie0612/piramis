import json
import re
import requests

with open("input.json", encoding="utf-8") as f:
  data = json.load(f)

for f in data['features']:
  name = f['properties']['Name']
  desc = f['properties']['description']
  coord_lon = f['geometry']['coordinates'][0]
  coord_lat = f['geometry']['coordinates'][1]

  # remove all html from description
  desc = re.sub(r'<[^>]*>', '', str(desc))
  print(f"{name} {desc} {coord_lon} {coord_lat}")

  # send to PB
  url = 'http://localhost:8090/api/collections/places/records'
  headers = {'Content-Type': 'application/json'}
  data = {
    "name": name,
    "description": desc,
    "coord_lon": coord_lon,
    "coord_lat": coord_lat,
    "creator": "pln5yqsxeb8v320",
    "type": "np6b796gc55nrcu"
  }
  r = requests.post(url, headers=headers, json=data)