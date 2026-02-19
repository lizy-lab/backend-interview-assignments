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

## Exercise Tasks

### 1. Implement `MemoryProductRepository`

**File:** `src/infrastructure/repository/memory_product_repository.py`

The class extends `ProductRepository` but has no implementation. Implement the `save`, `find_by_id`, and `find_all` methods using an in-memory data structure.

### 2. Implement `update_stock()` method

**File:** `src/domain/model/product.py`

The method currently raises `NotImplementedError`. Implement stock update logic with validation that stock cannot go negative.

### 3. Write tests for `update_stock` validation

**File:** `tests/unit/domain/test_product.py`

Two tests are provided. Write additional tests:
- Test decreasing stock with a negative quantity
- Test that reducing stock below zero raises `ValueError`

### 4. Complete the Dockerfile

**File:** `Dockerfile`

Complete the 5 TODOs to containerize the FastAPI application.

**Hints:**
- The app uses `uv` for dependency management
- Dependencies are defined in `pyproject.toml` and locked in `uv.lock`
- The FastAPI app entry point is `src.api.main:app`
- The server runs on port 8000

**Verification (if Docker is available):**

```bash
docker build -t product-api .
docker run -p 8000:8000 product-api
curl http://localhost:8000/api/products
```

## Running Tests

```bash
uv run pytest
```

## Running the Server

```bash
uv run uvicorn src.api.main:app --reload --port 8000
```

Visit `http://localhost:8000/docs` for interactive API documentation.

## Verification

```bash
curl http://localhost:8000/api/products
# Should return []

curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":9.99,"stock":10}'
```
