from tavily import TavilyClient
from backend.core.config import settings
import os

# Initialize client only if API key is present to avoid errors during tests/setup
client = None
if hasattr(settings, "TAVILY_API_KEY") and settings.TAVILY_API_KEY:
    client = TavilyClient(api_key=settings.TAVILY_API_KEY)

async def tavily_search(query: str):
    # Wrapper for mocking purposes
    if not client:
        # Fallback for testing/missing key
        return {"results": []}
    return client.search(query=query, search_depth="advanced")

async def search_web(query: str) -> list[dict]:
    response = await tavily_search(query)
    return response.get("results", [])
