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
        """Adjust stock by a delta (positive adds, negative removes).

        Raises ValueError if the result would be negative.
        """
        new_stock = self.stock + quantity
        if new_stock < 0:
            raise ValueError(
                f"Insufficient stock: have {self.stock}, cannot apply {quantity}"
            )
        self.stock = new_stock