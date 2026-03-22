# CivicConnect AI 🏛️
### AI-Powered Civic Complaint Management System
**Team NoAlpha | IET Hackathon 2026**

---

## What is CivicConnect AI?

CivicConnect AI is a full-stack web application that allows citizens to report local civic issues — potholes, power outages, water supply failures, waste problems — and have them **automatically classified and routed** to the correct government department using a large language model (LLaMA 3.3 70B via Groq).

No more phone calls. No more manual triage. No more black holes.

---

## Features

- 📍 **Geo-tagged complaints** — Pin the exact location on an interactive Leaflet map or use your device's GPS
- 🤖 **AI Auto-routing** — LLaMA 3.3 70B classifies each complaint by department, category, and priority in under 1 second
- 🗺️ **Live complaint map** — Colour-coded markers for all complaints across the city, by department
- 📊 **Real-time status tracking** — Resolution timeline from submission to completion
- 🔐 **Secure authentication** — bcrypt password hashing + JWT session tokens
- ☁️ **Cloud database** — MongoDB Atlas stores all complaints with coordinates and AI results

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | EJS + Bootstrap 5 + Leaflet.js |
| Backend | Node.js + Express 5 |
| AI Classifier | Python + FastAPI + Groq API (LLaMA 3.3 70B) |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (HS256) + bcrypt |
| Maps | Leaflet.js + OpenStreetMap |

---

## Project Structure

```
├── app.js                  # Express server — routes, session, DB connection
├── classifier.py           # Groq LLM classification logic
├── main.py                 # FastAPI microservice — exposes /classify endpoint
├── config/
│   └── db.js               # MongoDB Atlas connection
├── models/
│   ├── user-model.js       # User schema with bcrypt pre-save hook
│   └── complaint-model.js  # Complaint schema with geo-coords and AI fields
├── public/
│   ├── javascripts/
│   │   ├── report.js       # Map init, geo-pin, form submission
│   │   ├── map.js          # Live complaint map with coloured markers
│   │   ├── login.js        # Login fetch call
│   │   └── signup.js       # Signup fetch call
│   └── stylesheets/        # Page-specific CSS
├── views/
│   ├── home.ejs            # Landing page
│   ├── report.ejs          # Complaint submission form + map
│   ├── status.ejs          # Dynamic resolution timeline
│   ├── map.ejs             # Live geo complaint map
│   ├── login.ejs           # Login page
│   └── signup.ejs          # Signup page (Citizen / Official)
├── requirements.txt        # Python dependencies
└── package.json            # Node dependencies
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account (free tier)
- Groq API key (free at console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/DerronRodrigues21/On-code-civics_policy-.git
cd On-code-civics_policy-
```

### 2. Set up environment variables
Create a `.env` file in the root:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/iet_hackathon
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secret_key
```

### 3. Install Node dependencies
```bash
npm install
```

### 4. Install Python dependencies
```bash
pip install -r requirements.txt
pip install uvicorn
```

### 5. Run both servers

**Terminal 1 — Node.js:**
```bash
npm run dev
```

**Terminal 2 — Python classifier:**
```bash
uvicorn main:app --reload --port 8000
```

### 6. Open the app
```
http://localhost:3000
```

---

## How It Works

1. Citizen visits `/report`, describes the issue and pins a location on the map
2. On submit, Node.js POSTs the complaint to the FastAPI classifier at `localhost:8000`
3. FastAPI sends it to Groq's LLaMA 3.3 70B with a structured system prompt
4. The LLM returns `{ department, category, priority, summary }` as JSON
5. Node.js saves the result to MongoDB with coordinates and a unique ticket ID
6. Citizen is redirected to `/status` showing the AI classification and timeline
7. The live `/map` page fetches all complaints from MongoDB and plots coloured markers

---

## AI Departments

| Department | Map Colour |
|---|---|
| Roads & Transport | 🔴 |
| Water Supply | 🔵 |
| Health Department | 🟢 |
| Police Department | ⚫ |
| Waste Management | 🟤 |
| Education Department | 🟣 |
| Housing Department | 🟠 |
| Electricity Board | 🟡 |
| Parks & Recreation | 🌿 |

---

## Team NoAlpha

Built for IET Hackathon 2026.

---

## License

MIT