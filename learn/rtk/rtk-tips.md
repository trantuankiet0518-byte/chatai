# RTK (Rust Token Killer) Guide

## What is RTK?
RTK is a CLI proxy tool designed to optimize token usage during development. It works by intercepting common commands (like `git`, `npm`, `pytest`) and filtering out unnecessary output or using cached context to reduce the amount of data sent to the AI.

## Key Commands
- `rtk gain`: Shows real-time token savings analytics.
- `rtk gain --history`: Displays a history of executed commands and exactly how many tokens were saved per command.
- `rtk discover`: Analyzes your command history to suggest better ways to save tokens.
- `rtk proxy <cmd>`: Runs a command raw, bypassing all filters (use this if a command is failing due to RTK's filtering).

## Why we use `rtk gain --history`?
I use this command to:
1. **Audit Efficiency:** See which operations are "expensive" in terms of tokens.
2. **Verify Hooks:** Ensure that the transparent hooks (like `git status` being rewritten to `rtk git status`) are actually active and saving tokens.
3. **Optimize Output:** If a command saves 0% tokens, it means I should probably use a more specific flag (like `-q` for quiet) or adjust RTK settings.

## Tips & Tricks
- Always check `rtk gain` at the end of a session to see your total "ROI" (Return on Investment) for using AI.
- Use `rtk gain --history` before a large commit or build to ensure you aren't leaking too much context.
