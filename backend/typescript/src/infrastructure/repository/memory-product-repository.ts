import type { Product } from "../../domain/model/product";
import { ProductRepository } from "../../domain/repository/product-repository";

/** In-memory implementation of ProductRepository. */
export class MemoryProductRepository extends ProductRepository {
}
