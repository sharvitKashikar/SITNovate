import re
from pdfminer.high_level import extract_text

def extract_text_from_pdf(file):
    """
    Extracts text from a PDF file and cleans unnecessary characters.
    :param file: Uploaded PDF file
    :return: Cleaned extracted text as a string
    """
    try:
        text = extract_text(file.file)  # Extract raw text

        if not text or len(text) < 100:
            return None  # Ignore PDFs with too little text

        # ✅ Remove extra newlines & spaces
        text = re.sub(r'\n+', '\n', text)  # Collapse multiple newlines
        text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces

        # ✅ Remove special characters & unwanted symbols
        text = re.sub(r'[^A-Za-z0-9,.!?\'"\s]', '', text)  # Keep only readable characters
        
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

