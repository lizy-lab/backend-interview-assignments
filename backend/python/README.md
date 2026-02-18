# Python Backend

FastAPI + Pydantic backend following DDD architecture.

## Prerequisites

- Python 3.8+
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

### 3. Write a test for negative stock validation

**File:** `tests/unit/domain/test_product.py`

Two tests are provided. Add a third test that verifies `update_stock` raises a `ValueError` when the resulting stock would be negative.

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
