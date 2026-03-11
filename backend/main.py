from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import database
import nlp_engine

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransformationRequest(BaseModel):
    text: str
    tone_type: str # 'Academic' or 'Office'
    format_type: str # 'Message' or 'Email'

class TransformationResponse(BaseModel):
    id: int
    original_text: str
    transformed_text: str
    tone_type: str
    format_type: str

@app.post("/transform", response_model=TransformationResponse)
def transform_text(request: TransformationRequest, db: Session = Depends(database.get_db)):
    transformed = nlp_engine.transform_tone(request.text, request.tone_type, request.format_type)
    
    # Save to history
    db_history = database.ChatHistory(
        original_text=request.text,
        transformed_text=transformed,
        tone_type=request.tone_type,
        format_type=request.format_type
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    
    return db_history

class LetterRequest(BaseModel):
    topic: str

@app.post("/generate-letter", response_model=TransformationResponse)
def generate_letter(request: LetterRequest, db: Session = Depends(database.get_db)):
    letter_content = nlp_engine.generate_letter(request.topic)
    
    # Save to history with tone_type='Letter'
    db_history = database.ChatHistory(
        original_text=request.topic,
        transformed_text=letter_content,
        tone_type="Letter",
        format_type="Formal"
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    
    return db_history

@app.get("/history", response_model=List[TransformationResponse])
def get_history(db: Session = Depends(database.get_db)):
    return db.query(database.ChatHistory).order_by(database.ChatHistory.timestamp.desc()).all()

@app.delete("/history")
def clear_history(db: Session = Depends(database.get_db)):
    db.query(database.ChatHistory).delete()
    db.commit()
    return {"message": "History cleared successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
