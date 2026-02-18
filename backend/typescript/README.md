# TypeScript Backend

Fastify + Zod backend following DDD architecture, running on Bun.

## Prerequisites

- [Bun](https://bun.sh/) runtime

## Setup

```bash
cd backend/typescript
bun install
```

## Exercise Tasks

### 1. Implement `MemoryProductRepository`

**File:** `src/infrastructure/repository/memory-product-repository.ts`

The class extends `ProductRepository` but has no implementation. Implement the `save`, `findById`, and `findAll` methods using an in-memory data structure.

### 2. Implement `updateStock()` method

**File:** `src/domain/model/product.ts`

The method currently throws `Error("Stock update logic not implemented yet.")`. Implement stock update logic with validation that stock cannot go negative.

### 3. Write tests for `updateStock` validation

**File:** `tests/unit/domain/product.test.ts`

Two tests are provided. Write additional tests:
- Test decreasing stock with a negative quantity
- Test that reducing stock below zero throws an error

## Running Tests

```bash
bun test
```

## Running the Server

```bash
bun run dev
```

## Verification

```bash
curl http://localhost:8000/api/products
# Should return []

curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":9.99,"stock":10}'
```
