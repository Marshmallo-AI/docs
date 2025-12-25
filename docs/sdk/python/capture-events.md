---
sidebar_position: 3
---

# Capture Events

## Capture Basics
Create a task first. Every event you emit after that is linked to the active task.

You should emit:
- tool calls
- LLM calls
- any useful logs

## Agent Definitions
Marlo stores the system prompt, tools, MCP servers, and model config. This makes rewards reliable.
Use `@marlo.trace(...)` or call `marlo.register_agent_definition(...)` once.

```python
marlo.register_agent_definition(
    name="support_agent",
    system_prompt="You are a support agent.",
    tool_definitions=[{"name": "search_orders", "description": "lookup orders"}],
    mcp_definitions=[],
    model_config={"provider": "gemini", "model": "gemini-3-flash"},
)
```

## LLM Calls
Use `track_llm`. Reasoning is optional. If your model returns it, pass it in.

```python
marlo.track_llm(
    input="refund order 123",
    output="Refund completed.",
    model="gemini-3-flash",
    usage={"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14},
    reasoning={"summary": "Order found, refund issued."},
)
```

## Tool Calls
Use `track_tool` with tool name, input, output, and error if any.

```python
marlo.track_tool(
    tool="search_orders",
    input={"order_id": "123"},
    output={"status": "ok"},
)
```

## Custom Logs
Use `track_log` for anything else you want to keep with the task.

```python
marlo.track_log(metadata={"note": "Manual override used"})
```

## Multi‑Agent Traces
If your agent spawns sub‑agents, open a child trace. Marlo will build the agent tree.

```python
parent_id = marlo.get_current_agent_id()

with marlo.trace_agent(
    name="billing_subagent",
    system_prompt="You are a billing subagent.",
    tool_definitions=[],
    mcp_definitions=[],
    model_config={"provider": "gemini", "model": "gemini-3-flash"},
    parent_agent_id=parent_id,
):
    marlo.track_tool(tool="search_orders", input={"order_id": "123"}, output={"status": "ok"})
```
