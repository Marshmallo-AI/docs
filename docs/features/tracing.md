---
sidebar_position: 1
---

# Tracing

## What Is Tracing
Tracing records what the agent did during a task. It includes LLM calls, tool calls, and logs.

## What Gets Stored
For each task, Marlo stores:
- events (LLM calls, tool calls, logs)
- timestamps
- agent definitions (system prompt, tools, MCP, model)
- agent relationships (root agent and sub‑agents)

Each event includes `agent_id` and `parent_agent_id`, so Marlo can rebuild the agent tree.

## How To Enable
Start a session and a task, then emit events. That is enough to capture a trace.
