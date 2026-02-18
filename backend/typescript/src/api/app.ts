import cors from "@fastify/cors";
import Fastify from "fastify";
import { ProductService } from "../application/product-service";
import { MemoryProductRepository } from "../infrastructure/repository/memory-product-repository";
import { productRoutes } from "./routes";

const app = Fastify();

await app.register(cors, {
  origin: ["http://localhost:5173", "http://localhost:3000"],
});

// Dependency injection
const repository = new MemoryProductRepository();
const productService = new ProductService(repository);

// Routes
app.register(productRoutes(productService), { prefix: "/api/products" });

app.get("/", async () => ({
  message: "Product Management API",
  health: "ok",
}));

app.get("/health", async () => ({
  status: "healthy",
}));

app.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
