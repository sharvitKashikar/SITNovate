import pymongo
from backend.config import MONGO_URI


# Establish MongoDB Connection
client = pymongo.MongoClient(MONGO_URI)
db = client["summarizerDB"]
summaries_collection = db["summaries"]

def connect_db():
    try:
        client.server_info()  # Verify connection
        print("✅ Successfully connected to MongoDB")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
