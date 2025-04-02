import pytest
from uuid import UUID

from src.domain.model.product import Product


def test_create_product():
    # Given
    name = "Test Product"
    price = 10.99
    stock = 5

    # When
    product = Product.create(name=name, price=price, stock=stock)

    # Then
    assert isinstance(product.id, UUID)
    assert product.name == name
    assert product.price == price
    assert product.stock == stock


def test_update_stock_positive():
    # Given
    product = Product.create(name="Test Product", price=10.99, stock=5)
    initial_stock = product.stock

    # When
    product.update_stock(3)

    # Then
    assert product.stock == initial_stock + 3


def test_update_stock_negative():
    # Given
    product = Product.create(name="Test Product", price=10.99, stock=5)
    initial_stock = product.stock

    # When
    product.update_stock(-2)

    # Then
    assert product.stock == initial_stock - 2


def test_update_stock_validation_error():
    # Given
    product = Product.create(name="Test Product", price=10.99, stock=5)

    # When/Then
    with pytest.raises(ValueError):
        product.update_stock(-10)  # Trying to reduce more than available stock