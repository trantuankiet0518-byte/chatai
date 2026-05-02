# How to Start a New AI Session

This document serves as the primary bootstrap instruction for any AI agent (Gemini, Codex, Qwen, etc.) entering this repository for a new session.

## Bootstrap Sequence

When a new session begins, the AI agent MUST perform the following steps in order:

1.  **Read `GEMINI.md`**: Understand the core operational mandates (TDD, SDD, RTK, and Memory logging).
2.  **Explore `memory/`**: Locate the most recent date folder (e.g., `memory/2026-05-02/`) and read the individual task files to understand the project's history.
3.  **Check `next_tasks.md`**: Read the latest `next_tasks.md` in the most recent memory folder to identify the current objective and the next pending task.
4.  **Sync Git**: Verify the current branch and ensure all previous task branches are pushed to the remote repository.
5.  **Initialize Work**: Create a new task branch (e.g., `task-N-feature-name`) before writing any implementation code.

## Preferred User Prompt

To ensure the AI agent follows this workflow perfectly, the user should provide a prompt like:

> *"Read GEMINI.md and the latest memory folder, then continue with the next task in next_tasks.md. Follow the mandates and use Subagent-Driven Development."*

## Knowledge Maintenance

- If the AI agent encounters a new technical challenge or implements a complex pattern, it must document it in the `learn/` folder.
- Every atomic task completed must result in a new `.md` file in the current day's memory folder.
