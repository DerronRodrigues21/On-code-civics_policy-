import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1" 
)

SYSTEM_PROMPT = """

You are a civic complaint classifier for Indian government departments.
Given a citizen complaint, classify it and respond ONLY in this exact JSON format with no extra text:
{
  "department": "...",
  "category": "...",
  "priority": "Low | Medium | High",
  "summary": "one line summary"
}

Available departments:
- Police Department
- Roads & Transport
- Water Supply
- Health Department
- Waste Management
- Education Department
- Housing Department
- Electricity Board
- Parks & Recreation

"""

def classify_complaint(complaint: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": f"Complaint: {complaint}"}
        ],
        max_tokens=200,
        temperature=0.1
    )

    raw = response.choices[0].message.content.strip()
    
    # If groq returns a markdown response - then hoe to handle it
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    
    return json.loads(raw)
