# Full-Stack DDD Interview Assignment

A Domain-Driven Design (DDD) full-stack project for live coding interviews. Candidates choose either **Python** or **TypeScript** for the backend — both serve the same API contract and work with the shared React frontend.

## Choose Your Backend

| | Python | TypeScript |
|---|---|---|
| **Directory** | [`backend/python/`](backend/python/) | [`backend/typescript/`](backend/typescript/) |
| Runtime | Python 3.13+ / uv | Bun |
| Framework | FastAPI | Fastify |
| Validation | Pydantic | Zod |
| Testing | pytest | bun test |

Pick one and follow the README inside that directory.

> Both backends serve on **port 8000** — run one at a time.

## Frontend (Shared)

The React frontend is shared by both backends.

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

```
backend-interview-assignments/
├── backend/
│   ├── python/            # Python backend (FastAPI + Pydantic)
│   └── typescript/        # TypeScript backend (Fastify + Zod)
├── frontend/              # React frontend (shared)
└── README.md
```

## Interview Exercise

This is a **two-part full-stack exercise** that tests:
- **Backend:** DDD architecture, repository pattern, domain validation
- **Frontend:** React hooks, state management, API integration

### Part 1: Backend (see language-specific README)

1. Implement the in-memory repository
2. Implement the `updateStock` method with validation
3. Write a test for negative stock validation

### Part 2: Frontend

Complete the `ProductList` component (`frontend/src/components/ProductList.jsx`):
1. Fetch products on mount using `useEffect`
2. Implement search filtering by name
3. Render the product list
4. Handle loading and error states

## Part 3: DevOps

**Goal:** Complete the Dockerfile to containerize the backend API.

### Task

Open `Dockerfile` in the project root and complete the 5 TODOs:

1. Copy dependency files
2. Install dependencies
3. Copy source code
4. Expose the correct port
5. Set the startup command

### Hints

- The app uses `uv` for dependency management
- Dependencies are defined in `pyproject.toml` and locked in `uv.lock`
- The FastAPI app entry point is `src.api.main:app`
- The server runs on port 8000

### Verification (if Docker is available)

```bash
# Build the image
docker build -t product-api .

# Run the container
docker run -p 8000:8000 product-api

# Test the API
curl http://localhost:8000/api/products
```

---

## Architecture Overview

Both backends follow the same Clean Architecture / DDD layered structure:

```
Domain Layer        →  Pure business logic, no dependencies
Application Layer   →  Service orchestration, use cases
Infrastructure Layer → Technical implementations (repository)
API Layer           →  HTTP endpoints, request/response schemas
```

### Data Flow

```
User Action (Browser)
    ↓
React Component
    ↓
API Service (fetch)
    ↓
REST Endpoint (FastAPI / Fastify)
    ↓
Application Service
    ↓
Domain Model
    ↓
Repository Interface
    ↓
Infrastructure (Memory/DB)
```
