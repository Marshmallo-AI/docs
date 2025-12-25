---
sidebar_position: 2
---

# Quickstart

## Install
```bash
pip install marlo
```

## Define Your Agent
Marlo needs your agent definition once per run. This includes system prompt, tool definitions, MCP definitions, and model config.

```python
import marlo.learning as marlo

SYSTEM_PROMPT = "You are a support agent."
TOOL_DEFINITIONS = [{"name": "search_orders", "description": "lookup orders"}]
MCP_DEFINITIONS = []
MODEL_CONFIG = {"provider": "gemini", "model": "gemini-3-flash"}

@marlo.trace(
    system_prompt=SYSTEM_PROMPT,
    tool_definitions=TOOL_DEFINITIONS,
    mcp_definitions=MCP_DEFINITIONS,
    model_config=MODEL_CONFIG,
)
def run_agent(task: str) -> str:
    return "OK"
```

If you cannot use decorators, call `marlo.register_agent_definition(...)` once at startup.

## Create a Session
Start one session for a long chat or a long job. A session can hold many tasks.
Storage is required. Marlo will not run without a database.

```python
import marlo.learning as marlo
from marlo.storage.postgres.database import Database
from marlo.core.config.models import StorageConfig

config = StorageConfig(database_url="postgresql://user:pass@localhost:5432/marlo")
db = Database(config)
await db.connect()

session_id, learning_state = await marlo.init_session(
    db,
    task="support chat",
    metadata={"agent_id": "support_agent"},
)
```

You can reuse the same session for many tasks in a row.

## Capture Events
Start a task, then emit tool/LLM calls while the agent works.

```python
import marlo.learning as marlo

events, subscription = marlo.attach_event_sink()
task_id = await marlo.start_task(db, session_id=session_id, task="refund order 123")

marlo.track_tool(tool="search_orders", input={"order_id": "123"}, output={"status": "ok"})
marlo.track_llm(
    input="refund order 123",
    output="Refund completed.",
    model="gemini-3-flash",
    usage={"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14},
    reasoning={"summary": "Order found, refund issued."},
)

Reasoning is optional. If your model does not return it, leave it out.

await marlo.persist_events(db, session_id=session_id, events=events)
subscription.unsubscribe()
```

## Finalize and Get Learnings
End the task, then run reward + learning for the session.

```python
await marlo.finalize_task(
    db,
    task_id=task_id,
    status="success",
    final_answer="Refund completed.",
)

await marlo.run_reward_and_learning(db, session_id=session_id)
learning_state = await marlo.get_learning_state(db, learning_key="support_agent")
```

If you have more tasks, start another task and repeat the same steps.

## End the Session
If the session is finished, close it.

```python
await marlo.finalize_session(
    db,
    session_id=session_id,
    status="success",
    final_answer="Session finished",
)
```
