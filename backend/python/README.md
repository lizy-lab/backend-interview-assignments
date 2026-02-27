# Python Backend

FastAPI + Pydantic backend following DDD architecture.

## Prerequisites

- Python 3.13+
- [uv](https://docs.astral.sh/uv/) package manager

## Setup

```bash
cd backend/python
uv sync
```

## Architecture

The codebase follows Clean Architecture with DDD layered structure:

```
Domain Layer           Pure business logic, no dependencies
Application Layer      Service orchestration, use cases
Infrastructure Layer   Technical implementations (repository)
API Layer              HTTP endpoints, request/response schemas
```

Your tasks touch the **Domain** and **Infrastructure** layers.

## Running Tests

```bash
uv run pytest
```

## Running the Server

```bash
uv run uvicorn src.api.main:app --reload --port 8000
```

## Tasks

### 1. Implement `MemoryProductRepository`

**File:** `src/infrastructure/repository/memory_product_repository.py`

The class extends `ProductRepository` but has no implementation. Implement `save`, `find_by_id`, and `find_all` using an in-memory data structure.

### 2. Implement `update_stock()`

**File:** `src/domain/model/product.py`

The `quantity` parameter is a **delta**: positive adds stock, negative removes stock.

- `update_stock(3)` on a product with stock 10 → stock becomes 13
- `update_stock(-2)` on a product with stock 10 → stock becomes 8

If the result would be negative, raise a `ValueError`.

### 3. Implement the test stubs

**File:** `tests/unit/domain/test_product.py`

Two tests are marked `TODO`. Implement them.

### 4. Complete the Dockerfile *(optional, time-permitting)*

**File:** `Dockerfile`

Complete the 5 TODOs to containerize the application.

**Hints:**
- Dependencies: `pyproject.toml` + `uv.lock`
- Entry point: `src.api.main:app`
- Port: 8000

**Verification (if Docker is available):**

```bash
docker build -t product-api .
docker run -p 8000:8000 product-api
curl http://localhost:8000/api/products
```

## Verification

```bash
curl http://localhost:8000/api/products
# Should return []

curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":9.99,"stock":10}'
```
