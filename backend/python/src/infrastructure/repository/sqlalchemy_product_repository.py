"""SQLAlchemy-backed product repository.

Maps between the pure-domain ``Product`` and the ``DbProduct`` ORM model so
the domain layer stays free of any persistence concerns.
"""
from uuid import UUID

from sqlalchemy.orm import sessionmaker

from src.domain.model.product import Product
from src.domain.repository.product_repository import ProductRepository
from src.infrastructure.orm.product_db import DbProduct


def _to_domain(row: DbProduct) -> Product:
    return Product(
        id=UUID(row.id),
        name=row.name,
        price=row.price,
        stock=row.stock,
    )


class SqlAlchemyProductRepository(ProductRepository):
    def __init__(self, session_factory: sessionmaker):
        self._session_factory = session_factory

    def save(self, product: Product) -> None:
        session = self._session_factory()
        try:
            row = session.get(DbProduct, str(product.id))
            if row is None:
                row = DbProduct(id=str(product.id))
                session.add(row)
            row.name = product.name
            row.price = product.price
            row.stock = product.stock
            session.commit()
        finally:
            session.close()

    def find_by_id(self, product_id: UUID) -> Product | None:
        session = self._session_factory()
        try:
            row = session.get(DbProduct, str(product_id))
            return _to_domain(row) if row is not None else None
        finally:
            session.close()

    def find_all(self) -> list[Product]:
        session = self._session_factory()
        try:
            rows = session.query(DbProduct).all()
            return [_to_domain(r) for r in rows]
        finally:
            session.close()
