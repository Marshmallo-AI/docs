---
sidebar_position: 2
---

# What Marlo Provides

## Capture
Capture agent runs without changing how your agent works. Marlo stores:
- LLM calls (messages, model, usage, reasoning if available)
- tool calls (name, input, output, error)
- logs you choose to emit
- agent definitions (system prompt, tools, MCP servers, model config)
- agent trees (root agent and sub‑agents)

Storage is required. Marlo does not run without persistence.

## Reward
Score each task with a judge model. Rewards include:
- score
- principles
- rationale
- uncertainty

## Learning
Turn rewards into learnings. Learnings have:
- a cue (what to detect)
- an action (what to do)
- an expected effect

Learnings can be shadow or active and are tracked over time.

## Simulation
Simulate tasks in a controlled environment. Use this for testing ideas before production.

## Reports
Get summaries of rewards, learnings, and usage. Reports help you see what is improving.
