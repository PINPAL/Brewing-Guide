import json
import os

script_dir = os.path.dirname(__file__)

# Load the language.json file from the script directory
# Example Structure:
# {
#    "Afrikaans": "af_za",
#    "Arabic": "ar_sa",
#    "Asturian": "ast_es",
#    ...

json_file = os.path.join(script_dir, 'language.json')
with open(json_file, 'r') as f:
    data = json.load(f)
    
# Get the en_us.json file from the resource pack
en_us_file = os.path.join(script_dir, '..', 'assets', 'minecraft', 'lang', 'en_us.json')

# Create a copy of the en_us.json file for each language and name it according to the language code
for language, code in data.items():
    new_file = os.path.join(script_dir, '..', 'assets', 'minecraft', 'lang', f'{code}.json')
    with open(en_us_file, 'r') as f:
        en_us_data = json.load(f)
    with open(new_file, 'w') as f:
        json.dump(en_us_data, f, indent=4)
