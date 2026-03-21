from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from classifier import classify_complaint

app = FastAPI()

class ComplaintRequest(BaseModel):
    complaint: str

class ComplaintResponse(BaseModel):
    complaint: str
    department: str
    category: str
    priority: str
    summary: str

@app.get("/")
def root():
    return {"status": "Civic Complaint Classifier is running"}

@app.post("/classify", response_model=ComplaintResponse)
async def classify(req: ComplaintRequest):
    if not req.complaint.strip():
        raise HTTPException(status_code=400, detail="Complaint text is empty")
    
    try:
        result = classify_complaint(req.complaint)
        # **result unpacks the dict
        return ComplaintResponse(complaint=req.complaint, **result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))