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

This is a **three-part full-stack exercise** that tests:
- Backend: DDD architecture, repository pattern, domain validation
- API: REST endpoint design and integration
- Frontend: React hooks, state management, API integration

---

## Part 1: Backend Implementation (Required)

**Goal:** Complete the backend domain and infrastructure layers.

### Tasks

1. **Implement `MemoryProductRepository`** (`src/infrastructure/repository/memory_product_repository.py`)
   - Implement `save()` - Store product in memory dictionary
   - Implement `find_by_id()` - Retrieve product by UUID
   - Implement `find_all()` - Return all products as a list
   - Use a dictionary with UUID keys for storage

2. **Implement `update_price()` method** (`src/domain/model/product.py`)
   - Add method to Product class: `update_price(self, new_price: float)`
   - Validate that price cannot be negative
   - Raise `ValueError` if price < 0
   - Update the product's price

3. **Write tests** for price validation
   - Test valid price updates
   - Test that negative prices raise `ValueError`
   - Follow existing test patterns in `tests/unit/`

### Running Backend Tests

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=src

# Run specific test file
uv run pytest tests/unit/domain/test_product.py
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

## Part 2: Frontend Implementation (Required)

**Goal:** Complete the `ProductList` component to display products with search functionality.

### Location
`frontend/src/components/ProductList.jsx`

### Running the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Tasks

The component skeleton is provided with detailed TODO comments. Implement:

1. **Use `useEffect` to fetch products on mount**
   - Import and use `useEffect` from React
   - Call `fetchProducts()` from the API service
   - Handle loading and error states
   - Update products state with fetched data

2. **Implement search functionality**
   - Connect search input to `searchQuery` state
   - Filter products by name (case-insensitive)
   - Display filtered results

3. **Render product list**
   - Use `.map()` to render each product
   - Display: name, price, stock, ID
   - Add proper React keys (product.id)
   - Show "No products found" when empty

### Skills Tested
- React hooks: `useState`, `useEffect`
- Component lifecycle understanding
- Array methods: `.filter()`, `.map()`
- Controlled inputs
- Conditional rendering
- Async data fetching


### Testing Your Implementation

1. Start the backend: `uv run uvicorn src.api.main:app --reload`
2. Start the frontend: `cd frontend && npm run dev`
3. Create products using the "Create Product" tab
4. Verify they appear in the "Product List" tab
5. Test the search functionality

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

---

## API Documentation

Once the backend is running, visit:
- Interactive docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### Available Endpoints

- `POST /api/products` - Create product
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get single product
- `PATCH /api/products/{id}/stock` - Update stock
- `PATCH /api/products/{id}/price` - Update price

---

## Evaluation Criteria

### Backend
- Correct implementation of repository pattern
- Proper domain validation (price rules)
- Understanding of DDD layers and dependencies

### Frontend
- Proper use of React hooks (`useState`, `useEffect`)
- Correct list rendering with keys

### Integration & Communication
- Working end-to-end flow
- Explanation of design decisions
- Code quality and best practices
- Problem-solving approach
