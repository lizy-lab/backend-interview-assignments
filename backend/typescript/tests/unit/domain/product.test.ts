import { describe, expect, test } from "bun:test";
import { Product } from "../../../src/domain/model/product";

describe("Product", () => {
  test("create product", () => {
    // Given
    const name = "Test Product";
    const price = 10.99;
    const stock = 5;

    // When
    const product = Product.create(name, price, stock);

    // Then
    expect(product.id).toBeDefined();
    expect(product.name).toBe(name);
    expect(product.price).toBe(price);
    expect(product.stock).toBe(stock);
  });

  test("update stock positive", () => {
    // Given
    const product = Product.create("Test Product", 10.99, 5);
    const initialStock = product.stock;

    // When
    product.updateStock(3);

    // Then
    expect(product.stock).toBe(initialStock + 3);
  });

  test.todo("update stock negative throws error");
});
