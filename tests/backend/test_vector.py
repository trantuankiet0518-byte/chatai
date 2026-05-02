import pytest
from backend.ai.rag import upsert_vector, query_vector

@pytest.mark.asyncio
async def test_upsert_and_query_vector(monkeypatch):
    # Mocking Supabase and Embeddings to avoid actual API calls
    async def mock_upsert(*args, **kwargs):
        return True
    async def mock_query(*args, **kwargs):
        return [{"content": "Matched content", "metadata": {"source": "test.md"}}]
    
    # We need to make sure the module exists before monkeypatching
    import backend.ai.rag
    monkeypatch.setattr("backend.ai.rag.supabase_upsert", mock_upsert)
    monkeypatch.setattr("backend.ai.rag.supabase_query", mock_query)
    
    await upsert_vector("Test content", {"source": "test.md"})
    results = await query_vector("Test query")
    
    assert len(results) > 0
    assert results[0]["content"] == "Matched content"
