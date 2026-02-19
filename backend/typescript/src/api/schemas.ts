import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
});

export const updateStockSchema = z.object({
  quantity: z.number().int(),
});

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
});

export const errorResponseSchema = z.object({
  detail: z.string(),
});

export type ProductCreate = z.infer<typeof productCreateSchema>;
export type UpdateStock = z.infer<typeof updateStockSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
