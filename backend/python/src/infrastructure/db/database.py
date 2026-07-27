"""Database engine, session factory, and declarative base.

Everything here is pre-wired for the exercise. The database is a local
SQLite file (``interview.db``) created automatically on first startup, so
there is no migration step to run and nothing to configure.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# File-backed SQLite. The file is created on first connection and lives
# next to where the server is started. It is gitignored.
DATABASE_URL = "sqlite:///./interview.db"

# check_same_thread=False is required for SQLite under FastAPI's threadpool.
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""
    pass


def create_tables() -> None:
    """Create all tables. Idempotent — safe to call on every startup.

    Importing the ORM models here (not at module top) guarantees they are
    registered on ``Base.metadata`` before ``create_all`` runs.
    """
    from src.infrastructure.orm import product_db  # noqa: F401

    Base.metadata.create_all(bind=engine)
