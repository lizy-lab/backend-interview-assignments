/**
 * Seed the database with sample products.
 *
 * Runs on startup so the catalog is never empty — you need products in stock
 * to place orders against them. A few items ship with intentionally low stock
 * so insufficient-stock scenarios are easy to trigger.
 */
import { Product } from "../../domain/model/product";
import type { Db } from "./database";
import { products } from "./schema";

// [name, price, stock]
const SAMPLE_PRODUCTS: Array<[string, number, number]> = [
  ["Mechanical Keyboard", 89.99, 20],
  ["Wireless Mouse", 24.99, 35],
  ['27" 4K Monitor', 349.99, 8],
  ["USB-C Cable 2m", 9.99, 100],
  ["Laptop Stand", 39.99, 15],
  ["Noise-Cancelling Headphones", 199.99, 6],
  ["Ergonomic Chair", 249.99, 3],
  ["Standing Desk", 499.99, 2],
  ["External SSD 1TB", 119.99, 18],
  ["Docking Station", 179.99, 1],
];

/** Insert sample products if the products table is empty. Idempotent. */
export function seedProducts(db: Db): void {
  const existing = db.select().from(products).all();
  if (existing.length > 0) {
    return;
  }

  for (const [name, price, stock] of SAMPLE_PRODUCTS) {
    const product = Product.create(name, price, stock);
    db.insert(products)
      .values({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
      })
      .run();
  }
}
