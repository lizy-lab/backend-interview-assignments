# Backend Interview Assignment

A simple Domain-Driven Design (DDD) Python project for a live coding interview.

## Project Structure

The project follows a classic DDD structure:

```
src/
├── domain/            # Domain layer
│   ├── model/         # Domain models
│   └── repository/    # Repository interfaces
├── application/       # Application layer
└── infrastructure/    # Infrastructure layer
    └── repository/    # Repository implementations
tests/
└── unit/              # Unit tests
```

## Getting Started

### Prerequisites

- Python 3.8+
- Poetry

### Installation

```bash
# Install dependencies
poetry install
```

### Running Tests

```bash
# Run tests
poetry run pytest

# Run tests with coverage
poetry run pytest --cov=src
```

## Live Coding Exercise

This project provides a foundation for a simple product management system. During the interview, you will be asked to:

1. Implement new features
2. Refactor existing code
3. Fix bugs
4. Write additional tests
5. Explain design decisions and trade-offs

The code follows Domain-Driven Design principles, separating the domain logic from application services and infrastructure concerns.

### Tasks
1. Implement InMemoryProductRepository.
2. Implement update_price method on Product aggregate, including tests.
3. Ensure that price cannot be negative, it should raise a ValueError if attempted to set a negative price.