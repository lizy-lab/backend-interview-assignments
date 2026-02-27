# TypeScript Backend

Fastify + Zod backend following DDD architecture, running on Bun.

## Prerequisites

- [Bun](https://bun.sh/) runtime

## Setup

```bash
cd backend/typescript
bun install
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
bun test
```

## Running the Server

```bash
bun run dev
```

## Tasks

### 1. Implement `MemoryProductRepository`

**File:** `src/infrastructure/repository/memory-product-repository.ts`

The class extends `ProductRepository` but has no implementation. Implement `save`, `findById`, and `findAll` using an in-memory data structure.

### 2. Implement `updateStock()`

**File:** `src/domain/model/product.ts`

The `quantity` parameter is a **delta**: positive adds stock, negative removes stock.

- `updateStock(3)` on a product with stock 10 → stock becomes 13
- `updateStock(-2)` on a product with stock 10 → stock becomes 8

If the result would be negative, throw an `Error`.

### 3. Implement the test stubs

**File:** `tests/unit/domain/product.test.ts`

Two tests are marked `todo`. Implement them.

### 4. Complete the Dockerfile *(optional, time-permitting)*

**File:** `Dockerfile`

Complete the 5 TODOs to containerize the application.

**Hints:**
- Dependencies: `package.json` + `bun.lock`
- Entry point: `src/api/app.ts`
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
