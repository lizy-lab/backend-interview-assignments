/**
 * Test helper for the application layer.
 *
 * Provides a repository backed by an isolated in-memory SQLite database so
 * each test runs against real persistence without touching the on-disk file.
 */
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { type Db, createTables } from "../../src/infrastructure/db/database";
import * as schema from "../../src/infrastructure/db/schema";
import { DrizzleProductRepository } from "../../src/infrastructure/repository/drizzle-product-repository";

/** A fresh in-memory database with all tables created. */
export function createTestDb(): Db {
  const sqlite = new Database(":memory:");
  createTables(sqlite);
  return drizzle(sqlite, { schema });
}

/** A product repository backed by a fresh in-memory database. */
export function createTestProductRepository(): DrizzleProductRepository {
  return new DrizzleProductRepository(createTestDb());
}
