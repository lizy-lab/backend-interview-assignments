# TypeScript Backend

Hono + Zod + Drizzle backend following DDD architecture, running on Bun.

## Prerequisites

- [Bun](https://bun.sh/) runtime

## Setup

```bash
cd backend/typescript
bun install
```

## Architecture

The codebase currently follows a Clean Architecture / DDD layered structure:

```
Domain Layer           Pure business logic, no framework/persistence deps
Application Layer      Service orchestration, use cases
Infrastructure Layer   Technical implementations (DB, schema, repositories)
API Layer              HTTP endpoints, request/response schemas
```

Persistence is a local **SQLite** database (`interview.db`), accessed through
**Drizzle**. It is created automatically the first time you start the server,
and seeded with a sample product catalog — there is no migration step to run.

The **Product** feature is already implemented end to end (domain model →
repository interface → table schema → Drizzle repository → service → API routes
+ schemas). Treat it as a reference for how the current code is organised.

## Running Tests

```bash
bun test
```

## Running the Server

```bash
bun run dev
```

Existing endpoints:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create a product |
| `GET` | `/api/products/:productId` | Fetch one product |
| `PATCH` | `/api/products/:productId/stock` | Adjust stock by a delta |

## Your Task

Work however you normally would. If that includes an AI coding agent (e.g.
Claude Code), go ahead and use it — it's welcome, not required, and you won't
be scored on the choice either way. What we're interested in is the **design
decisions** you make and how you **reason about the code you end up with**,
not how fast you type.

One thing we'd love you to do as you go, whichever way the code arrives:
talk us through what a chunk does in your own words before you settle on it.
Think of it as reviewing a teammate's PR out loud. It helps us follow your
thinking, and it's really the heart of what we're looking at here.

### How to spend the time

You have **~40 minutes**, and we will stop you when the time is up — so plan
for it rather than discovering it. Here's roughly how we'd budget it:

| Share | ≈ Time | What |
|---|---|---|
| 10–15% | 4–6 min | **Get oriented.** Skim the code, read the ticket below, ask us whatever you need. With or without an agent — your call. |
| 30–40% | 12–16 min | **Build it.** Get customers and orders working. |
| the rest | ~18–22 min | **Verify, wrap up, course-correct.** Exercise the endpoints for real, run the tests, ask questions, change your mind about something if you need to. |

Whatever exists at the deadline is what we look at, so bias towards having
something working and verified over something half-built. The main thing we'd
steer you away from is a long silent analysis phase — start building early and
expect to revise. Questions to us don't count against you; ask them as you go.

**From here on, it's all on you.** That includes the decisions already baked
into the starter code — the layering, the domain/persistence split, the data
types, the error handling, all of it. None of it is off-limits. If you think
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

- **The backend is the deliverable.** Customers and orders working end to end —
  domain model, persistence, service, HTTP endpoints — is the bar.
- The behaviour should hold up when things go wrong, not just on the happy
  path. Think about what could go wrong when an order is placed and make sure
  the system behaves sensibly.
- Include at least one test that demonstrates what happens when an order
  **cannot** be fully fulfilled. It should make the guarantee you've chosen
  obvious to a reviewer.

Ask questions if anything is unclear — deciding what "sensible" means here is
part of the exercise.

### If you have time left over *(optional)*

There's a small React frontend in [`frontend/`](../../frontend/) — see its
README for setup. It ships with a ready-made API client
(`src/services/api.js`) and a working create-product form; the product list is
still a stub. Putting a thin UI on top of your new work (creating a customer,
placing an order, looking one up) is a welcome bonus.

Only reach for this once the backend stands on its own, though: a finished
backend beats a half-finished stack, and we won't hold it against you if there
was never time.
