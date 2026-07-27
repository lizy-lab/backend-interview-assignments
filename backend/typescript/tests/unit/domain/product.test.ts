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

  test("update stock decrease", () => {
    // Given
    const product = Product.create("Test Product", 10.99, 5);

    // When
    product.updateStock(-2);

    // Then
    expect(product.stock).toBe(3);
  });

  test("update stock negative throws error", () => {
    // Given
    const product = Product.create("Test Product", 10.99, 5);

    // When / Then
    expect(() => product.updateStock(-10)).toThrow();

    // And stock is unchanged
    expect(product.stock).toBe(5);
  });
});
