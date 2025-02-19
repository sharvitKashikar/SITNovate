import re
from pdfminer.high_level import extract_text

def extract_text_from_pdf(file):
    """
    Extracts text from a PDF file and cleans unnecessary characters.
    :param file: Uploaded PDF file
    :return: Cleaned extracted text as a string
    """
    try:
        text = extract_text(file.file)  

        if not text or len(text) < 100:
            return None  

       
        text = re.sub(r'\n+', '\n', text) 
        text = re.sub(r'\s+', ' ', text).strip()  
       
        text = re.sub(r'[^A-Za-z0-9,.!?\'"\s]', '', text)  
        
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

