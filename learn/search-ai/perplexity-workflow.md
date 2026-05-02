# Perplexity-like AI Workflow (Second Brain Search)

## The Concept
A "Perplexity-like" search doesn't just return links; it reads the web, synthesizes an answer, and stores the knowledge for future use.

## Workflow Flow
1. **Routing:** AI decides "Do I know this?" (Check Vector DB) vs "Should I look it up?" (Search Web).
2. **Web Search:** Use Tavily/DuckDuckGo to get clean text from the internet.
3. **Context Injection:** Feed the search results into a high-context LLM (Gemini 1.5 Flash).
4. **Knowledge Crystallization:** Convert the answer into a structured Markdown file.
5. **Embedding:** Turn the Markdown into vectors and save to Supabase pgvector.

## Why this is powerful?
- **Infinite Memory:** The more you search, the smarter your "Second Brain" becomes.
- **Cost Saving:** Future queries are answered from local knowledge, not expensive search APIs.
- **Privacy:** Your processed knowledge is stored as files you own (Obsidian style).
