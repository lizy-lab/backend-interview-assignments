/**
 * Drizzle table definitions.
 *
 * Note: these are *persistence* models and are intentionally separate from the
 * pure-domain `Product` class. The repository maps between the two.
 */
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
});

export type ProductRow = typeof products.$inferSelect;
