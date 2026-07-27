"""FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import router
from src.application.product_service import ProductService
from src.infrastructure.db.database import SessionLocal, create_tables
from src.infrastructure.db.seed import seed_products
from src.infrastructure.repository.sqlalchemy_product_repository import (
    SqlAlchemyProductRepository,
)

# Create FastAPI app
app = FastAPI(
    title="Product Management API",
    description="REST API for managing products with DDD architecture",
    version="1.0.0"
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite and common React ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the SQLite database file + tables and seed sample products on startup.
create_tables()
seed_products()

# Initialize repository and service (Dependency Injection)
repository = SqlAlchemyProductRepository(SessionLocal)
product_service = ProductService(repository)

# Make service available to routes
app.state.product_service = product_service

# Include API routes
app.include_router(router, prefix="/api")


@app.get("/")
def root():
    """Root endpoint."""
    return {
        "message": "Product Management API",
        "docs": "/docs",
        "health": "ok"
    }


@app.get("/health")
def health():
    """Health check endpoint."""
    return {"status": "healthy"}
