# backend/storage/vault.py
import os
from datetime import datetime

def save_markdown(vault_dir: str, title: str, content: str, sources: list[str]) -> str:
    if not os.path.exists(vault_dir):
        os.makedirs(vault_dir)
        
    filename = f"{title.replace(' ', '-').lower()}.md"
    filepath = os.path.join(vault_dir, filename)
    
    source_links = "\n".join([f"- {s}" for s in sources])
    full_content = f"# {title}\n\nDate: {datetime.now().isoformat()}\n\n{content}\n\n## Sources\n{source_links}"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_content)
        
    return filepath

def list_markdown_files(vault_dir: str) -> list[str]:
    if not os.path.exists(vault_dir):
        return []
    return [f for f in os.listdir(vault_dir) if f.endswith(".md")]
