# Python Backend

FastAPI + Pydantic + SQLAlchemy backend following DDD architecture.

## Prerequisites

- Python 3.13+
- [uv](https://docs.astral.sh/uv/) package manager

## Setup

```bash
cd backend/python
uv sync
```

## Architecture

The codebase currently follows a Clean Architecture / DDD layered structure:

```
Domain Layer           Pure business logic, no framework/persistence deps
Application Layer      Service orchestration, use cases
Infrastructure Layer   Technical implementations (DB, ORM, repositories)
API Layer              HTTP endpoints, request/response schemas
```

Persistence is a local **SQLite** database (`interview.db`). It is created
automatically the first time you start the server, and seeded with a sample
product catalog — there is no migration step to run.

The **Product** feature is already implemented end to end (domain model →
repository interface → ORM model → SQLAlchemy repository → service → API
routes + schemas). Treat it as a reference for how the current code is
organised.

## Running Tests

```bash
uv run pytest
```

## Running the Server

```bash
uv run uvicorn src.api.main:app --reload --port 8000
```

Interactive API docs: http://localhost:8000/docs

## Your Task

You'll be working with an AI coding agent (e.g. Claude Code). Use it however
you normally would — we're interested in how you **direct and review** the
agent and in the **design decisions** you make, not in how fast you type.

One thing we'd love you to do as you go: whenever the agent hands you a chunk
of code, talk us through what it does in your own words before you accept or
tweak it. Think of it as reviewing a teammate's PR out loud. It helps us follow
your thinking, and it's really the heart of what we're looking at here.

**From here on, it's all on you.** That includes the decisions already baked
into the starter code — the layering, the domain/ORM split, the data types,
the error handling, all of it. None of it is off-limits. If you think
something in the existing code is wrong or over-built, you're free to change
it. The only conditions: you can **justify** the change, and you still **land
the work within the time available**. Equally, if you keep something, be ready
to say why.

We want to add two features to the shop backend: **customers** and **orders**.

### Customers

We need to keep track of customers. A customer has a name and an email
address. We should be able to create a customer and look one up.

### Orders

A customer can place an **order**. An order is for one or more products, and
for each product the customer says how many they want. Placing an order should
reduce the stock of the products that were ordered, since those items are now
spoken for.

We need to be able to place an order and to look up a previously placed order
(including what was in it).

### What we expect

- The behaviour should hold up when things go wrong, not just on the happy
  path. Think about what could go wrong when an order is placed and make sure
  the system behaves sensibly.
- Include at least one test that demonstrates what happens when an order
  **cannot** be fully fulfilled. It should make the guarantee you've chosen
  obvious to a reviewer.

Ask questions if anything is unclear — deciding what "sensible" means here is
part of the exercise.
