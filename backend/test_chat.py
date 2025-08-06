import requests

url = "http://localhost:5001/api/chat"
message = input("Ask KurianGPT: ")

while message.lower() != "exit":
    response = requests.post(url, json={"message": message})
    if response.ok:
        print("KurianGPT:", response.json().get("reply", "No reply"))
    else:
        print("Error:", response.status_code, response.text)
    message = input("\nAsk KurianGPT: ")
