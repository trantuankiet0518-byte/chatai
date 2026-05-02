from fastapi import FastAPI
from backend.core.config import settings

app = FastAPI(title="Second Brain Search API")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
