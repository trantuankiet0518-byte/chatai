import os
import pytest
from backend.core.config import Settings

def test_settings_load_env_vars(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "http://test-url")
    monkeypatch.setenv("SUPABASE_KEY", "test-key")
    monkeypatch.setenv("GEMINI_API_KEY", "gemini-key")
    monkeypatch.setenv("TAVILY_API_KEY", "tavily-key")
    
    # Create a new instance of Settings to pick up the monkeypatched environment variables
    settings = Settings()
    
    assert settings.SUPABASE_URL == "http://test-url"
    assert settings.SUPABASE_KEY == "test-key"
    assert settings.GEMINI_API_KEY == "gemini-key"
    assert settings.TAVILY_API_KEY == "tavily-key"
