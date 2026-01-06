"""Pydantic schemas for API request/response models."""
from pydantic import BaseModel, Field
from uuid import UUID
from typing import List


class ProductCreate(BaseModel):
    """Schema for creating a new product."""
    name: str = Field(..., min_length=1, description="Product name")
    price: float = Field(..., ge=0, description="Product price (must be non-negative)")
    stock: int = Field(..., ge=0, description="Product stock quantity")


class ProductResponse(BaseModel):
    """Schema for product response."""
    id: str
    name: str
    price: float
    stock: int

    class Config:
        from_attributes = True


class UpdateStock(BaseModel):
    """Schema for updating product stock."""
    quantity: int = Field(..., description="Quantity to add (positive) or remove (negative)")


class ErrorResponse(BaseModel):
    """Schema for error responses."""
    detail: str
