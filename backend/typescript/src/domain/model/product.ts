import { randomUUID } from "crypto";

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
  ) {}

  static create(name: string, price: number, stock: number): Product {
    return new Product(randomUUID(), name, price, stock);
  }

  /** Update product stock quantity. */
  updateStock(quantity: number): void {
    throw new Error("Stock update logic not implemented yet.");
  }
}
