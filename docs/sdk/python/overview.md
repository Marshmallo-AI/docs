---
sidebar_position: 1
---

# Python SDK

## What You Provide
You run the agent yourself. You start a session, then create a task for each user request. You send events while the task runs, and then you end that task with the result.
Use one import: `import marlo.learning as marlo`.

You also provide your agent definition:
- system prompt
- tool definitions
- MCP definitions (if any)
- model config (provider + model)

Use the same tool and MCP definitions that your agent uses at runtime. This lets Marlo evaluate and learn without calling your code again.

Model config is just the model name you used. Example: `{"provider": "gemini", "model": "gemini-3-flash"}`.

## What Marlo Gives Back
Marlo stores the trajectory, runs reward evaluation, and generates learnings. You can fetch those learnings and feed them back into your agent.

## Multi‑Agent Support
If you have sub‑agents, you can open a child trace for each sub‑agent. Marlo will store the agent tree and evaluate each task with that structure.

## Minimal Flow
The smallest working flow is:
1) `init_session`
2) `start_task`
3) `track_llm` / `track_tool` / `track_log`
4) `finalize_task`
5) `run_reward_and_learning`

The learning key usually comes from `agent_id`. You can also pass `learning_key` explicitly when you start a session.
