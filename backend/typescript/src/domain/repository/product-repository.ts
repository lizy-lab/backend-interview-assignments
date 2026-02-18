import type { Product } from "../model/product";

export abstract class ProductRepository {
  abstract save(product: Product): void;
  abstract findById(productId: string): Product | null;
  abstract findAll(): Product[];
}
