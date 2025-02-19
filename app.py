from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.summarize import router as summarize_router

from backend.db import connect_db


app = FastAPI()

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Database
connect_db()

# Register API Routes
app.include_router(summarize_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AI Document Summarizer API is Running!"}
