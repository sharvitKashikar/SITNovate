import requests
from bs4 import BeautifulSoup

def extract_text_from_url(url):
    """
    Scrapes and extracts only the main content from a news article.
    :param url: News article URL
    :return: Cleaned extracted article text
    """
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return None

        soup = BeautifulSoup(response.text, "html.parser")

     
        content_div = soup.find("div", {"class": "Normal"})  
        if not content_div:
            content_div = soup.find("div", {"class": "article-content"}) 
        
        if content_div:
            paragraphs = content_div.find_all("p")
        else:
            paragraphs = soup.find_all("p")  

      
        article_text = " ".join([p.get_text().strip() for p in paragraphs])

      
        unwanted_phrases = [
            "The TOI News Desk", "Times of India", "Read More", "Subscribe to our newsletter", "Follow us on",
            "Advertisement", "Trending Now", "Breaking News", "India News", "Latest Updates"
        ]
        for phrase in unwanted_phrases:
            article_text = article_text.replace(phrase, "")

        
        article_text = " ".join(article_text.split())

       
        print("\nExtracted News Text:\n", article_text[:500]) 

        return article_text if len(article_text) > 200 else None  # Return only if it's meaningful
    except Exception as e:
        print(f"Error extracting text from URL: {e}")
        return None
