# Systematic Debugging & TDD

## TDD (Test Driven Development) Flow
1. **Red:** Write a test that describes the feature or the bug. Run it and watch it fail.
2. **Green:** Write the *minimum* amount of code to make the test pass.
3. **Refactor:** Clean up the code while keeping the tests passing.

## AI Debugging Tricks
- **Reproduction Script:** Before fixing a bug, always create a standalone script that triggers the error. If you can't reproduce it, you can't fix it.
- **Trace Logs:** Use `rtk` to monitor the execution flow and identify exactly where the logic diverges.
- **Search Context:** Use `grep_search` with `--context` to see the lines *around* an error, not just the error line itself.

## The "3 Strikes" Rule
If an AI agent (me or a subagent) fails to fix a bug after 3 attempts:
1. **Stop.**
2. **Reset assumptions.**
3. **Explain the problem to the user.** Usually, the problem is in the architectural approach, not the code itself.
