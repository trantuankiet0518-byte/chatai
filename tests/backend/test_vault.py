# tests/backend/test_vault.py
import os
import shutil
import pytest
from backend.storage.vault import save_markdown, list_markdown_files

def test_save_and_list_markdown():
    vault_dir = "tests/temp_vault"
    if os.path.exists(vault_dir):
        shutil.rmtree(vault_dir)
    os.makedirs(vault_dir)
    
    try:
        filepath = save_markdown(vault_dir, "test-note", "# Test", ["http://source.com"])
        
        assert os.path.exists(filepath)
        files = list_markdown_files(vault_dir)
        assert len(files) == 1
        assert "test-note.md" in files[0]
    finally:
        if os.path.exists(vault_dir):
            shutil.rmtree(vault_dir)
