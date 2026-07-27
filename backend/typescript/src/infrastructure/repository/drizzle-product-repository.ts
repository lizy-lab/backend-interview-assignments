/**
 * SQLite-backed product repository.
 *
 * Maps between the pure-domain `Product` and the `products` table row so the
 * domain layer stays free of any persistence concerns.
 */
import { eq } from "drizzle-orm";
import { Product } from "../../domain/model/product";
import { ProductRepository } from "../../domain/repository/product-repository";
import type { Db } from "../db/database";
import { type ProductRow, products } from "../db/schema";

function toDomain(row: ProductRow): Product {
  return new Product(row.id, row.name, row.price, row.stock);
}

export class DrizzleProductRepository extends ProductRepository {
  constructor(private readonly db: Db) {
    super();
  }

  save(product: Product): void {
    this.db.transaction((tx) => {
      tx.insert(products)
        .values({
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
        })
        .onConflictDoUpdate({
          target: products.id,
          set: {
            name: product.name,
            price: product.price,
            stock: product.stock,
          },
        })
        .run();
    });
  }

  findById(productId: string): Product | null {
    const row = this.db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .get();
    return row ? toDomain(row) : null;
  }

  findAll(): Product[] {
    return this.db.select().from(products).all().map(toDomain);
  }
}
