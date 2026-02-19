import { beforeEach, describe, expect, test } from "bun:test";
import { randomUUID } from "crypto";
import { ProductService } from "../../../src/application/product-service";
import { Product } from "../../../src/domain/model/product";
import { MemoryProductRepository } from "../../../src/infrastructure/repository/memory-product-repository";

describe("ProductService", () => {
  let repository: MemoryProductRepository;
  let service: ProductService;

  beforeEach(() => {
    repository = new MemoryProductRepository();
    service = new ProductService(repository);
  });

  test("create product", () => {
    // Given
    const name = "Test Product";
    const price = 10.99;
    const stock = 5;

    // When
    const product = service.createProduct(name, price, stock);

    // Then
    expect(product.id).toBeDefined();
    expect(product.name).toBe(name);
    expect(product.price).toBe(price);
    expect(product.stock).toBe(stock);
  });

  test("get product", () => {
    // Given
    const product = Product.create("Test Product", 10.99, 5);
    repository.save(product);

    // When
    const result = service.getProduct(product.id);

    // Then
    expect(result).not.toBeNull();
    expect(result!.id).toBe(product.id);
  });

  test("get nonexistent product", () => {
    // Given
    const nonexistentId = randomUUID();

    // When
    const result = service.getProduct(nonexistentId);

    // Then
    expect(result).toBeNull();
  });

  test("get all products", () => {
    // Given
    const product1 = Product.create("Product 1", 10.99, 5);
    const product2 = Product.create("Product 2", 20.99, 10);
    repository.save(product1);
    repository.save(product2);

    // When
    const results = service.getAllProducts();

    // Then
    expect(results).toHaveLength(2);
    expect(results.some((p) => p.id === product1.id)).toBe(true);
    expect(results.some((p) => p.id === product2.id)).toBe(true);
  });

  test("update product stock", () => {
    // Given
    const product = Product.create("Test Product", 10.99, 5);
    repository.save(product);
    const initialStock = product.stock;

    // When
    const updated = service.updateProductStock(product.id, 3);

    // Then
    expect(updated).not.toBeNull();
    expect(updated!.stock).toBe(initialStock + 3);
  });

  test("update nonexistent product stock", () => {
    // Given
    const nonexistentId = randomUUID();

    // When
    const result = service.updateProductStock(nonexistentId, 3);

    // Then
    expect(result).toBeNull();
  });
});
