import { Product } from "../domain/model/product";
import type { ProductRepository } from "../domain/repository/product-repository";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  createProduct(name: string, price: number, stock: number): Product {
    const product = Product.create(name, price, stock);
    this.productRepository.save(product);
    return product;
  }

  getProduct(productId: string): Product | null {
    return this.productRepository.findById(productId);
  }

  getAllProducts(): Product[] {
    return this.productRepository.findAll();
  }

  updateProductStock(productId: string, quantity: number): Product | null {
    const product = this.productRepository.findById(productId);
    if (product) {
      product.updateStock(quantity);
      this.productRepository.save(product);
    }
    return product;
  }
}
