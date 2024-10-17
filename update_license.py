import datetime
import re

current_year = datetime.datetime.now().year
file_path = 'LICENSE'

with open(file_path, 'r') as file:
    content = file.read()

# Regex to find any four-digit year in the content
new_content = re.sub(r'\b\d{4}\b', str(current_year), content)

with open(file_path, 'w') as file:
    file.write(new_content)

print("LICENSE file updated with the current year.")