from fastapi import APIRouter, HTTPException, File, UploadFile
from pydantic import BaseModel
from ..model.summarizer import generate_summary
from ..utils.pdf_handler import extract_text_from_pdf
from ..utils.web_scraper import extract_text_from_url
from ..db import summaries_collection

router = APIRouter()

# Input Schemas
class TextRequest(BaseModel):
    text: str

class URLRequest(BaseModel):
    url: str

@router.post("/summarize-text")
def summarize_text(request: TextRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="No text provided.")

    summary = generate_summary(request.text)
    summaries_collection.insert_one({"original_text": request.text, "summary": summary})

    return {"summary": summary}




@router.post("/summarize-pdf")
async def summarize_pdf(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file)

    if not text:
        raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

    summary = generate_summary(text)  # Apply summarization
    return {"summary": summary}



