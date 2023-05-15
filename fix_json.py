import json
from datetime import datetime

f = open("emprego-cientifico.json","r",encoding="utf-8")

json_file = json.load(f)

for j in json_file:
    start_date = datetime.strptime(j["DataInicioContrato"], "%d/%m/%Y")
    if j["DataFimContrato"] != "": end_date = datetime.strptime(j["DataFimContrato"], "%d/%m/%Y")
    
    j["DataInicioContrato"] = start_date.strftime("%Y-%m-%d")
    if j["DataFimContrato"] != "": j["DataFimContrato"] = end_date.strftime("%Y-%m-%d")

# Print the modified JSON file
out = open("emprego-cientifico-tratado.json","w",encoding="utf-8")

json.dump(json_file,out,indent=4)