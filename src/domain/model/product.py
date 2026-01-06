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
        raise NotImplementedError("Stock update logic not implemented yet.")