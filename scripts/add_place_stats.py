import requests

base_url = "http://localhost:8090/api/collections/"

# Get all places
url = base_url + "places/records?perPage=1000"
r = requests.get(url)

place_ids = [x.get("id") for x in r.json().get("items")]

# add empty place stats
for place_id in place_ids:

    url = base_url + f"place_stats/records"
    headers = {'Content-Type': 'application/json'}
    data = {
        "updated_by": "pln5yqsxeb8v320",
    }
    r = requests.post(url, headers=headers, json=data)
    new_stat_id = r.json().get("id")
    print(new_stat_id)
    # add place_stats to place
    url = base_url + f"places/records/{place_id}"

    headers = {'Content-Type': 'application/json'}
    data = {
        "stats": new_stat_id,
    }
    r = requests.patch(url, headers=headers, json=data)
    print(r.status_code)