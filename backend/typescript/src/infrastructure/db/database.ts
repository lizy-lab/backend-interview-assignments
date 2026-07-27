/**
 * Database connection and table creation.
 *
 * Everything here is pre-wired for the exercise. The database is a local
 * SQLite file (`interview.db`) created automatically on first startup, so
 * there is no migration step to run and nothing to configure.
 */
import { Database } from "bun:sqlite";
import { type BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

export type Db = BunSQLiteDatabase<typeof schema>;

/** File-backed SQLite. Created on first connection, next to where the server
 *  is started. It is gitignored. */
const DATABASE_FILE = "interview.db";

/**
 * Create the tables. Idempotent — safe to call on every startup.
 *
 * Drizzle declares the schema but does not create tables without drizzle-kit,
 * so the DDL lives here. Keep it in sync with `schema.ts`.
 */
export function createTables(sqlite: Database): void {
  sqlite.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    )
  `);
}

/** Open the on-disk database and create its tables. */
export function createDatabase(file: string = DATABASE_FILE): {
  sqlite: Database;
  db: Db;
} {
  const sqlite = new Database(file);
  createTables(sqlite);
  return { sqlite, db: drizzle(sqlite, { schema }) };
}
