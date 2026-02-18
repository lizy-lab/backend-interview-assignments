import type { FastifyPluginAsync } from "fastify";
import type { ProductService } from "../application/product-service";
import type { Product } from "../domain/model/product";
import { productCreateSchema, updateStockSchema } from "./schemas";
import type { ProductResponse } from "./schemas";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function toProductResponse(product: Product): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
  };
}

export function productRoutes(service: ProductService): FastifyPluginAsync {
  return async (fastify) => {
    fastify.post("/", async (request, reply) => {
      try {
        const parsed = productCreateSchema.safeParse(request.body);
        if (!parsed.success) {
          return reply.status(400).send({ detail: parsed.error.issues[0].message });
        }

        const { name, price, stock } = parsed.data;
        const product = service.createProduct(name, price, stock);
        return reply.status(201).send(toProductResponse(product));
      } catch (error) {
        return reply
          .status(500)
          .send({ detail: `Internal server error: ${error}` });
      }
    });

    fastify.get("/", async (_request, reply) => {
      try {
        const products = service.getAllProducts();
        return reply.send(products.map(toProductResponse));
      } catch (error) {
        return reply
          .status(500)
          .send({ detail: `Internal server error: ${error}` });
      }
    });

    fastify.get<{ Params: { productId: string } }>(
      "/:productId",
      async (request, reply) => {
        const { productId } = request.params;

        if (!UUID_REGEX.test(productId)) {
          return reply.status(400).send({ detail: "Invalid product ID format" });
        }

        try {
          const product = service.getProduct(productId);
          if (!product) {
            return reply.status(404).send({ detail: "Product not found" });
          }
          return reply.send(toProductResponse(product));
        } catch (error) {
          return reply
            .status(500)
            .send({ detail: `Internal server error: ${error}` });
        }
      },
    );

    fastify.patch<{ Params: { productId: string } }>(
      "/:productId/stock",
      async (request, reply) => {
        const { productId } = request.params;

        if (!UUID_REGEX.test(productId)) {
          return reply.status(400).send({ detail: "Invalid product ID format" });
        }

        const parsed = updateStockSchema.safeParse(request.body);
        if (!parsed.success) {
          return reply.status(400).send({ detail: parsed.error.issues[0].message });
        }

        try {
          const product = service.updateProductStock(
            productId,
            parsed.data.quantity,
          );
          if (!product) {
            return reply.status(404).send({ detail: "Product not found" });
          }
          return reply.send(toProductResponse(product));
        } catch (error) {
          if (error instanceof Error) {
            return reply.status(400).send({ detail: error.message });
          }
          return reply
            .status(500)
            .send({ detail: `Internal server error: ${error}` });
        }
      },
    );
  };
}
