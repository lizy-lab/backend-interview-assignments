from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID

from src.domain.model.product import Product


class ProductRepository(ABC):
    @abstractmethod
    def save(self, product: Product) -> None:
        """Save a product to the repository."""
        pass

    @abstractmethod
    def find_by_id(self, product_id: UUID) -> Optional[Product]:
        """Find a product by its ID."""
        pass

    @abstractmethod
    def find_all(self) -> List[Product]:
        """Find all products."""
        pass