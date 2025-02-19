from transformers import pipeline
import textwrap

# Load AI Model (BART for summarization)
summarization_pipeline = pipeline("summarization", model="facebook/bart-large-cnn")

def generate_summary(text: str) -> str:
    if len(text.split()) < 10:
        return "Text is too short for summarization."

    max_input_length = 1024  
    words = text.split()

    if len(words) > max_input_length:
        # Split text into chunks of 1024 words each and summarize separately
        chunks = [" ".join(words[i:i + max_input_length]) for i in range(0, len(words), max_input_length)]
        summaries = [summarization_pipeline(chunk, max_length=400, min_length=50, do_sample=False)[0]['summary_text'] for chunk in chunks]
        summary = " ".join(summaries)
    else:
        summary = summarization_pipeline(text, max_length=400, min_length=50, do_sample=False)[0]['summary_text']

    # ✅ Format for better readability
    formatted_summary = "\n".join(textwrap.wrap(summary, width=80))

    return formatted_summary
