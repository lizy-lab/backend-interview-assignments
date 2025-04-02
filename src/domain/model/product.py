from dataclasses import dataclass
from uuid import UUID, uuid4


@dataclass
class Product:
    id: UUID
    name: str
    price: float
    stock: int

    @staticmethod
    def create(name: str, price: float, stock: int) -> "Product":
        """Create a new product with a generated ID."""
        return Product(id=uuid4(), name=name, price=price, stock=stock)
    
    def update_stock(self, quantity: int) -> None:
        """Update product stock quantity."""
        if self.stock + quantity < 0:
            raise ValueError("Cannot reduce stock below zero")
        self.stock += quantity