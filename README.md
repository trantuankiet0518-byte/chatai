# ChatAI - The Eastern Astrology AI & Second Brain Search

ChatAI is a cutting-edge platform that blends ancient Eastern wisdom with modern Artificial Intelligence. It serves as both a specialized astrology engine (**Bazi**, **Tu Vi**, **Van Han**) and an intelligent research assistant that builds a "Second Brain" from your web searches.

## 🚀 The Mission
To provide a seamless interface where users can consult astrology charts, search the open web like **Perplexity**, and have the AI "crystallize" that knowledge into a personal, searchable Markdown vault (Obsidian-style).

---

## ✨ Key Features

### 1. Perplexity-like AI Search
- **Web-Augmented Generation**: Uses Tavily API to fetch clean, real-time data from the internet.
- **Gemini 1.5 Flash**: Powered by Google's latest LLM for fast, accurate, and high-context synthesis.

### 2. The Second Brain (Knowledge Vault)
- **Automatic Crystallization**: Answers from the web are automatically saved as `.md` files in a local vault.
- **RAG (Retrieval-Augmented Generation)**: Powered by **Supabase pgvector**. The system "remembers" what it found before, making future searches instant and cost-free.
- **Human-Readable**: Your knowledge is stored in files you own, compatible with Obsidian.

### 3. Eastern Astrology Engines
- **Bazi (Eight Characters)**: Accurate calculations of Heavenly Stems and Earthly Branches.
- **Tu Vi (Purple Star Astrology)**: Detailed palace and star mapping with decade cycle analysis.
- **Van Han (Fortune Prediction)**: Yearly and monthly predictions based on astronomical logic.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (React, Tailwind CSS, Framer Motion)
- **Backend**: FastAPI (Python 3.10+)
- **LLM**: Gemini 1.5 Flash (Google AI)
- **Search**: Tavily API
- **Vector DB**: Supabase (PostgreSQL + pgvector)
- **Storage**: Local Markdown Vault

---

## 🛠 Development Workflow
This project follows elite engineering standards:
- **TDD (Test-Driven Development)**: Every feature is verified with automated tests before implementation.
- **Subagent-Driven Development**: Tasks are orchestrated by a controller AI and implemented by specialized subagents for maximum focus and efficiency.
- **RTK (Rust Token Killer)**: Optimized CLI operations to minimize token usage and latency.

---

## 📂 Project Structure

- `/frontend`: The user interface (Next.js).
- `/backend`: The AI and API server (FastAPI).
- `/backend/vault`: Your personal Second Brain Markdown files.
- `/learn`: Documentation of workflows, tips, and AI "meta-processes".
- `/memory`: Granular, daily logs of every task completed.

---

## 🏁 How to Start

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/trantuankiet0518-byte/chatai.git
    ```
2.  **Initialize AI Session**:
    Open the repository in your preferred AI-enabled CLI and say:
    > "Read GEMINI.md and the latest memory folder, then continue with the next task in next_tasks.md."

---

Created with ❤️ for the intersection of tradition and technology.
