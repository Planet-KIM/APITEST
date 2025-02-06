import os
import json


current_path = os.path.dirname(os.path.realpath(__file__))
api_path = "./api_config.json"
with open(os.path.join(current_path, api_path)) as api_json_file:
    api_json_content = json.load(api_json_file)

for item in api_json_content['API']:
    print(item)

