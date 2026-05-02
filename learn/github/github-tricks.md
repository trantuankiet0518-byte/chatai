# GitHub Tips & Tricks for AI Coding

## 1. Remote Branch Management
- **Push all branches**: `git push --all origin` - Useful for backing up all task branches at once.
- **Upstream Tracking**: `git push -u origin <branch>` - Sets up tracking so you can just use `git push` later.

## 2. Commit Message Conventions
- **feat**: New features (e.g., `feat: add gemini integration`).
- **fix**: Bug fixes.
- **docs**: Documentation only changes.
- **chore**: Maintenance tasks (e.g., updating dependencies).

## 3. Workflow with AI
- **Frequent Pushes**: Always push after completing a subagent task to ensure remote safety.
- **Pull Requests (PRs)**: For team projects, use PRs for each task branch instead of merging directly to `main`.

## 4. Troubleshooting
- **Force Push**: `git push -f origin <branch>` - USE WITH CAUTION. Only use if you've rebased or amended commits on a private task branch.
- **Remote URL Update**: `git remote set-url origin <new-url>` - If the repository moves.
