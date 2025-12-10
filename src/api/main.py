"""FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import router
from src.application.product_service import ProductService
from src.infrastructure.repository.memory_product_repository import MemoryProductRepository

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

# Initialize repository and service (Dependency Injection)
# Note: In production, you'd use FastAPI's dependency injection system
repository = MemoryProductRepository()
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
