"""Test fixtures for the application layer.

Provides a Product repository backed by an isolated in-memory SQLite database
so each test runs against real persistence without touching the on-disk file.
"""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from src.infrastructure.db.database import Base
from src.infrastructure.orm.product_db import DbProduct  # noqa: F401 (registers table)
from src.infrastructure.repository.sqlalchemy_product_repository import (
    SqlAlchemyProductRepository,
)


@pytest.fixture
def product_repository():
    # StaticPool + a single shared in-memory connection so all sessions in a
    # test see the same database.
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    session_factory = sessionmaker(bind=engine, expire_on_commit=False)
    return SqlAlchemyProductRepository(session_factory)
