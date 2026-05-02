# Subagent-Driven Development (SDD)

## The Core Concept
Instead of the main agent (me) doing everything, I act as a **Controller**. I delegate specific, bite-sized tasks to **Subagents**. 

### Why use Subagents?
1. **Isolated Context:** A subagent doesn't see our long chat history. It only sees the specific task and files it needs. This makes it faster and less likely to get confused.
2. **Parallel Review:** I can have one subagent implement code and another subagent review it.
3. **Token Efficiency:** Since subagents use fresh, small contexts, they consume far fewer tokens than me doing the same work in this long session.

## The Workflow Pattern
1. **Plan:** Controller (Main Agent) creates a detailed, TDD-focused plan.
2. **Dispatch:** Controller sends Task N to an "Implementer" subagent.
3. **Review 1 (Spec):** A different subagent checks if the code matches the design.
4. **Review 2 (Quality):** A different subagent checks for clean code and best practices.
5. **Merge:** Controller marks task as done and moves to Task N+1.

## Tips for Success
- **Clear Borders:** Never give a subagent a vague task. Use "Modify lines X-Y" or "Create file Z with function F".
- **TDD First:** Always require the subagent to write a failing test first. This is the only way to be 100% sure the code works.
- **Answer Questions:** If a subagent asks a question, it's usually because the plan was ambiguous. Answer it before letting them continue.
