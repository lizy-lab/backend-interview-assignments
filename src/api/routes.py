"""API routes for product management."""
from fastapi import APIRouter, HTTPException, Request
from typing import List
from uuid import UUID

from src.api.schemas import (
    ProductCreate,
    ProductResponse,
    UpdateStock,
    UpdatePrice,
    ErrorResponse
)
from src.domain.model.product import Product

router = APIRouter(tags=["products"])


def get_product_service(request: Request):
    """Helper to get product service from app state."""
    return request.app.state.product_service


def product_to_response(product: Product) -> ProductResponse:
    """Convert domain Product to API response."""
    return ProductResponse(
        id=str(product.id),
        name=product.name,
        price=product.price,
        stock=product.stock
    )


@router.post("/products", response_model=ProductResponse, status_code=201)
def create_product(product_data: ProductCreate, request: Request):
    """
    Create a new product.

    - **name**: Product name (required)
    - **price**: Product price, must be >= 0 (required)
    - **stock**: Initial stock quantity, must be >= 0 (required)
    """
    try:
        service = get_product_service(request)
        product = service.create_product(
            name=product_data.name,
            price=product_data.price,
            stock=product_data.stock
        )
        return product_to_response(product)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/products", response_model=List[ProductResponse])
def get_all_products(request: Request):
    """
    Get all products.

    Returns a list of all products in the system.
    """
    try:
        service = get_product_service(request)
        products = service.get_all_products()
        return [product_to_response(p) for p in products]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: str, request: Request):
    """
    Get a product by ID.

    - **product_id**: UUID of the product
    """
    try:
        # Validate UUID format
        uuid_obj = UUID(product_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    try:
        service = get_product_service(request)
        product = service.get_product(uuid_obj)

        if product is None:
            raise HTTPException(status_code=404, detail="Product not found")

        return product_to_response(product)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.patch("/products/{product_id}/stock", response_model=ProductResponse)
def update_product_stock(product_id: str, stock_update: UpdateStock, request: Request):
    """
    Update product stock.

    - **product_id**: UUID of the product
    - **quantity**: Amount to add (positive) or remove (negative) from stock
    """
    try:
        uuid_obj = UUID(product_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    try:
        service = get_product_service(request)
        product = service.update_product_stock(uuid_obj, stock_update.quantity)

        if product is None:
            raise HTTPException(status_code=404, detail="Product not found")

        return product_to_response(product)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
