# Full-Stack DDD Interview Assignment

A Domain-Driven Design (DDD) Python + React project for live coding interviews. This exercise combines backend architecture with frontend development to assess full-stack capabilities.

## Project Structure

The project follows a full-stack DDD architecture:

```
backend/
├── src/
│   ├── domain/            # Domain layer (business logic)
│   │   ├── model/         # Domain models (Product)
│   │   └── repository/    # Repository interfaces
│   ├── application/       # Application layer (services)
│   ├── infrastructure/    # Infrastructure layer (implementations)
│   │   └── repository/    # Repository implementations
│   └── api/              # API layer (FastAPI)
│       ├── main.py       # FastAPI app
│       ├── routes.py     # REST endpoints
│       └── schemas.py    # Pydantic models
└── tests/
    └── unit/             # Unit tests

frontend/
└── src/
    ├── components/       # React components (INCOMPLETE)
    │   ├── ProductList.jsx
    │   └── CreateProductForm.jsx
    ├── services/         # API client (COMPLETE)
    └── App.jsx          # Main app (COMPLETE)
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+ and npm
- uv (Python package manager)

### Installation

```bash
# Install backend dependencies
uv sync

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Interview Exercise

This is a **two-part full-stack exercise** that tests:
- Backend: DDD architecture, repository pattern, domain validation
- Frontend: React hooks, state management, API integration

---

## Part 1: Backend Implementation

**Goal:** Complete the backend domain and infrastructure layers.

### Tasks

1. **Implement `MemoryProductRepository`** (`src/infrastructure/repository/memory_product_repository.py`)

2. **Implement `update_stock()` method** (`src/domain/model/product.py`)

3. **Write tests** for update_stock validation (`tests/unit/domain/test_product.py`)
   - Test update to decrease stock
   - Test that final negative stock raise `ValueError`

### Running Backend Tests

```bash
# Run all tests
uv run pytest
```

### Verification

Once implemented, the API should work. Test it:

```bash
# Start the FastAPI server
uv run uvicorn src.api.main:app --reload

# In another terminal, test the API
curl http://localhost:8000/api/products
```

You should see an empty array `[]`. Visit `http://localhost:8000/docs` for interactive API documentation.

---

## Part 2: Frontend Implementation

**Goal:** Complete the `ProductList` component to display products with search functionality.

### Location
`frontend/src/components/ProductList.jsx`

### Running the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Architecture Overview

### Clean Architecture Layers

**Domain Layer** (`src/domain/`)
- Pure business logic, no dependencies
- Product aggregate with business rules
- Repository interface (abstraction)

**Application Layer** (`src/application/`)
- Use cases and service orchestration
- ProductService coordinates operations
- Depends only on domain

**Infrastructure Layer** (`src/infrastructure/`)
- Technical implementations
- MemoryProductRepository (to be implemented)
- Can be swapped (e.g., PostgreSQL)

**API Layer** (`src/api/`)
- FastAPI REST endpoints
- Request/response schemas (Pydantic)
- Maps HTTP to application services

**Frontend** (`frontend/`)
- React components (functional + hooks)
- API service client for backend calls
- Simple, modern UI

### Data Flow

```
User Action (Browser)
    ↓
React Component
    ↓
API Service (fetch)
    ↓
FastAPI Endpoint
    ↓
Application Service
    ↓
Domain Model
    ↓
Repository Interface
    ↓
Infrastructure (Memory/DB)
```