import pytest
from unittest.mock import MagicMock, AsyncMock
from backend.ai import rag

@pytest.mark.asyncio
async def test_generate_answer_with_context(monkeypatch):
    async def mock_gemini_call(prompt):
        return "The answer based on context."
    
    # Mock call_gemini which is used by generate_answer
    monkeypatch.setattr(rag, "call_gemini", mock_gemini_call)
    
    answer = await rag.generate_answer("What is Tu Vi?", context=["Context about Tu Vi."])
    assert "answer" in answer.lower()

@pytest.mark.asyncio
async def test_get_embedding(monkeypatch):
    mock_result = MagicMock()
    mock_embedding = MagicMock()
    mock_embedding.values = [0.1, 0.2, 0.3]
    mock_result.embeddings = [mock_embedding]
    
    # client is at the module level in rag.py
    # We need to mock client.models.embed_content
    mock_client = MagicMock()
    mock_client.models.embed_content.return_value = mock_result
    
    monkeypatch.setattr(rag, "client", mock_client)
    
    embedding = await rag.get_embedding("test text")
    assert embedding == [0.1, 0.2, 0.3]
    mock_client.models.embed_content.assert_called_once_with(
        model="text-embedding-004",
        content="test text"
    )

@pytest.mark.asyncio
async def test_call_gemini(monkeypatch):
    mock_response = MagicMock()
    mock_response.text = "Hello from Gemini"
    
    mock_client = MagicMock()
    mock_client.models.generate_content.return_value = mock_response
    
    monkeypatch.setattr(rag, "client", mock_client)
    
    response_text = await rag.call_gemini("Hi")
    assert response_text == "Hello from Gemini"
    mock_client.models.generate_content.assert_called_once_with(
        model="gemini-1.5-flash",
        contents="Hi"
    )
