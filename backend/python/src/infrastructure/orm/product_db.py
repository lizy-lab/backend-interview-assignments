"""SQLAlchemy ORM model for products.

Note: this is a *persistence* model and is intentionally separate from the
pure-domain ``Product`` dataclass. The repository maps between the two.
"""
from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.db.database import Base


class DbProduct(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    stock: Mapped[int] = mapped_column(Integer, nullable=False)
