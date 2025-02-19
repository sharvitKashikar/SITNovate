import re
import textwrap
from transformers import pipeline

# Load AI Model (BART for summarization)
summarization_pipeline = pipeline("summarization", model="facebook/bart-large-cnn")

def clean_text(text: str) -> str:
   

    text = re.sub(r"[^A-Za-z0-9.,!?'\s-]", "", text)

 
    text = re.sub(r'\s+', ' ', text).strip()
    

    text = text.replace("\n", " ")


    text = re.sub(r'\s+([,.!?])', r'\1', text)  
    text = re.sub(r'([,.!?])\s+', r'\1 ', text)  
    
   
    text = re.sub(r'(\w+)- (\w+)', r'\1\2', text)  

    return text

def generate_summary(text: str) -> str:
    """
    Generates a cleaned summary using BART model.
    """
    if len(text.split()) < 10:
        return "Text is too short for summarization."

    max_input_length = 1024
    words = text.split()

    if len(words) > max_input_length:
        
        chunks = [" ".join(words[i:i + max_input_length]) for i in range(0, len(words), max_input_length)]
        summaries = [summarization_pipeline(chunk, max_length=400, min_length=50, do_sample=False)[0]['summary_text'] for chunk in chunks]
        summary = " ".join(summaries)
    else:
        summary = summarization_pipeline(text, max_length=400, min_length=50, do_sample=False)[0]['summary_text']


    cleaned_summary = clean_text(summary)

    return cleaned_summary
