import pytest
from backend.ai.search import search_web

@pytest.mark.asyncio
async def test_search_web_returns_results(monkeypatch):
    async def mock_tavily_search(*args, **kwargs):
        return {"results": [{"title": "Test Title", "content": "Test content", "url": "http://test.com"}]}
    
    monkeypatch.setattr("backend.ai.search.tavily_search", mock_tavily_search)
    
    results = await search_web("What is Tu Vi?")
    assert len(results) > 0
    assert results[0]["title"] == "Test Title"
