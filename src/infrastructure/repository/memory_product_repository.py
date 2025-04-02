from typing import Dict, List, Optional
from uuid import UUID

from src.domain.model.product import Product
from src.domain.repository.product_repository import ProductRepository


class MemoryProductRepository(ProductRepository):
    def __init__(self):
        self.products: Dict[UUID, Product] = {}

    def save(self, product: Product) -> None:
        """Save a product to the in-memory repository."""
        self.products[product.id] = product

    def find_by_id(self, product_id: UUID) -> Optional[Product]:
        """Find a product by its ID in the in-memory repository."""
        return self.products.get(product_id)

    def find_all(self) -> List[Product]:
        """Find all products in the in-memory repository."""
        return list(self.products.values())
