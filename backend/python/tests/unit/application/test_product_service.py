import pytest
from uuid import UUID, uuid4

from src.application.product_service import ProductService
from src.domain.model.product import Product
from src.infrastructure.repository.memory_product_repository import MemoryProductRepository


@pytest.fixture
def product_repository():
    return MemoryProductRepository()


@pytest.fixture
def product_service(product_repository):
    return ProductService(product_repository)


def test_create_product(product_service):
    # Given
    name = "Test Product"
    price = 10.99
    stock = 5

    # When
    product = product_service.create_product(name=name, price=price, stock=stock)

    # Then
    assert isinstance(product.id, UUID)
    assert product.name == name
    assert product.price == price
    assert product.stock == stock


def test_get_product(product_service, product_repository):
    # Given
    product = Product.create(name="Test Product", price=10.99, stock=5)
    product_repository.save(product)

    # When
    result = product_service.get_product(product.id)

    # Then
    assert result is not None
    assert result.id == product.id


def test_get_nonexistent_product(product_service):
    # Given
    nonexistent_id = uuid4()

    # When
    result = product_service.get_product(nonexistent_id)

    # Then
    assert result is None


def test_get_all_products(product_service, product_repository):
    # Given
    product1 = Product.create(name="Product 1", price=10.99, stock=5)
    product2 = Product.create(name="Product 2", price=20.99, stock=10)
    product_repository.save(product1)
    product_repository.save(product2)

    # When
    results = product_service.get_all_products()

    # Then
    assert len(results) == 2
    assert any(p.id == product1.id for p in results)
    assert any(p.id == product2.id for p in results)


def test_update_product_stock(product_service, product_repository):
    # Given
    product = Product.create(name="Test Product", price=10.99, stock=5)
    product_repository.save(product)
    initial_stock = product.stock

    # When
    updated_product = product_service.update_product_stock(product.id, 3)

    # Then
    assert updated_product is not None
    assert updated_product.stock == initial_stock + 3


def test_update_nonexistent_product_stock(product_service):
    # Given
    nonexistent_id = uuid4()

    # When
    result = product_service.update_product_stock(nonexistent_id, 3)

    # Then
    assert result is None