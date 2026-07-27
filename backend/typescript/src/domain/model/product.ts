import { randomUUID } from "node:crypto";

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

  /**
   * Adjust stock by a delta (positive adds, negative removes).
   *
   * Throws if the result would be negative.
   */
  updateStock(quantity: number): void {
    const newStock = this.stock + quantity;
    if (newStock < 0) {
      throw new Error(
        `Insufficient stock: have ${this.stock}, cannot apply ${quantity}`,
      );
    }
    this.stock = newStock;
  }
}
