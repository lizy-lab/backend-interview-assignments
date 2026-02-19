from uuid import UUID

from src.domain.model.product import Product
from src.domain.repository.product_repository import ProductRepository


class ProductService:
    def __init__(self, product_repository: ProductRepository):
        self.product_repository = product_repository

    def create_product(self, name: str, price: float, stock: int) -> Product:
        """Create a new product and save it to the repository."""
        product = Product.create(name=name, price=price, stock=stock)
        self.product_repository.save(product)
        return product

    def get_product(self, product_id: UUID) -> Product | None:
        """Get a product by its ID."""
        return self.product_repository.find_by_id(product_id)

    def get_all_products(self) -> list[Product]:
        """Get all products."""
        return self.product_repository.find_all()

    def update_product_stock(self, product_id: UUID, quantity: int) -> Product | None:
        """Update a product's stock."""
        product = self.product_repository.find_by_id(product_id)
        if product:
            product.update_stock(quantity)
            self.product_repository.save(product)
        return product