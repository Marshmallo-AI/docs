---
sidebar_position: 2
---

# How Rewards Work

## What the Judge Does
The judge looks at one task at a time. It reads the task trajectory and the final answer, then returns a score and rationale.

## Inputs and Outputs
Inputs: task text, task events, final answer, and metadata.
Outputs: score, principles, rationale, and uncertainty.

If you use sub‑agents, the agent tree is included in the context.

## When Rewards Run
Rewards run after a task is finalized and you call the reward runner.

## Long Tasks (Memory)
If a task is too large, Marlo summarizes the events into a memory state. The judge uses that summary instead of the full list.

## Reasoning
If your model returns reasoning, include it in `track_llm`. The judge will use it when available.
