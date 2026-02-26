import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { ProductService } from "../application/product-service";
import { MemoryProductRepository } from "../infrastructure/repository/memory-product-repository";
import { productRoutes } from "./routes";

const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  }),
);

// Dependency injection
const repository = new MemoryProductRepository();
const productService = new ProductService(repository);

// Routes
app.route("/api/products", productRoutes(productService));

app.get("/", (c) =>
  c.json({
    message: "Product Management API",
    health: "ok",
  }),
);

app.get("/health", (c) =>
  c.json({
    status: "healthy",
  }),
);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ detail: err.message }, err.status);
  }
  if (err instanceof Error) {
    return c.json({ detail: err.message }, 400);
  }
  return c.json({ detail: "Internal server error" }, 500);
});

export default {
  port: 8000,
  fetch: app.fetch,
};
