import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { Context } from "hono";
import type { z } from "zod";
import type { ProductService } from "../application/product-service";
import type { Product } from "../domain/model/product";
import {
  type ProductResponse,
  productCreateSchema,
  productIdParamSchema,
  updateStockSchema,
} from "./schemas";

function toProductResponse(product: Product): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
  };
}

const validationHook = (
  result: z.SafeParseReturnType<unknown, unknown>,
  c: Context,
) => {
  if (!result.success) {
    return c.json({ detail: result.error.issues[0].message }, 400);
  }
};

export function productRoutes(service: ProductService): Hono {
  const router = new Hono();

  router.post(
    "/",
    zValidator("json", productCreateSchema, validationHook),
    (c) => {
      const { name, price, stock } = c.req.valid("json");
      const product = service.createProduct(name, price, stock);
      return c.json(toProductResponse(product), 201);
    },
  );

  router.get("/", (c) => {
    const products = service.getAllProducts();
    return c.json(products.map(toProductResponse));
  });

  router.get(
    "/:productId",
    zValidator("param", productIdParamSchema, validationHook),
    (c) => {
      const { productId } = c.req.valid("param");
      const product = service.getProduct(productId);
      if (!product) {
        return c.json({ detail: "Product not found" }, 404);
      }
      return c.json(toProductResponse(product));
    },
  );

  router.patch(
    "/:productId/stock",
    zValidator("param", productIdParamSchema, validationHook),
    zValidator("json", updateStockSchema, validationHook),
    (c) => {
      const { productId } = c.req.valid("param");
      const { quantity } = c.req.valid("json");
      const product = service.updateProductStock(productId, quantity);
      if (!product) {
        return c.json({ detail: "Product not found" }, 404);
      }
      return c.json(toProductResponse(product));
    },
  );

  return router;
}
