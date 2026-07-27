"""Seed the database with sample products.

Runs on startup so the catalog is never empty — you need products in stock
to place orders against them. A few items ship with intentionally low stock
so insufficient-stock scenarios are easy to trigger.
"""
from src.domain.model.product import Product
from src.infrastructure.db.database import SessionLocal
from src.infrastructure.orm.product_db import DbProduct

# (name, price, stock)
SAMPLE_PRODUCTS = [
    ("Mechanical Keyboard", 89.99, 20),
    ("Wireless Mouse", 24.99, 35),
    ("27\" 4K Monitor", 349.99, 8),
    ("USB-C Cable 2m", 9.99, 100),
    ("Laptop Stand", 39.99, 15),
    ("Noise-Cancelling Headphones", 199.99, 6),
    ("Ergonomic Chair", 249.99, 3),
    ("Standing Desk", 499.99, 2),
    ("External SSD 1TB", 119.99, 18),
    ("Docking Station", 179.99, 1),
]


def seed_products() -> None:
    """Insert sample products if the products table is empty. Idempotent."""
    session = SessionLocal()
    try:
        if session.query(DbProduct).count() > 0:
            return
        for name, price, stock in SAMPLE_PRODUCTS:
            product = Product.create(name=name, price=price, stock=stock)
            session.add(
                DbProduct(
                    id=str(product.id),
                    name=product.name,
                    price=product.price,
                    stock=product.stock,
                )
            )
        session.commit()
    finally:
        session.close()
