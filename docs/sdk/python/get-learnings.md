---
sidebar_position: 4
---

# Get Learnings

## Fetch Active Learnings
Active learnings are tied to a learning key (usually your agent id). Fetch them after rewards run.

```python
learning_state = await marlo.get_learning_state(db, learning_key="support_agent")
active = (learning_state or {}).get("active", [])
```

## Inject Into Your Agent
Put active learnings into your system prompt or planner before the next task.

## Track Usage Automatically
When learnings are active, Marlo tracks cue hits and adoptions during each task.
