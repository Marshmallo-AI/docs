---
sidebar_position: 3
---

# How Learning Works

## From Reward to Learning
After each task reward, Marlo reads the rationale and extracts useful patterns. It stores them as learning objects tied to your learning key.

The learning key usually matches your agent id. You can set it when you start a session or task.

## Learning Objects
Each learning has:
- a cue (what to detect)
- an action (what to do)
- an expected effect

## Promotion Loop
Learnings start in shadow. If they help over time, they can move to active.

## Shadow and Active
Shadow learnings are tracked but not injected. Active learnings are injected and tracked.

## Demotion
If a learning hurts rewards or increases failures, it can be moved back to shadow.
