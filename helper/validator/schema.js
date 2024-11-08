import { z } from "zod";

export const eventSchema = z.object({
  eventName: z
    .string()
    .min(1, { message: "Event name is required" })
    .max(50, { message: "Event name must be 50 characters or less" }),
});

export const descriptionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be 500 characters or less" }),
});

export const eventLocationSchema = z.object({
  province: z
    .string()
    .min(1, { message: "Province name is required" })
    .toUpperCase()
    .max(50, { message: "Province name must be 50 characters or less" }),
  city: z
    .string()
    .toUpperCase()
    .min(1, { message: "City name is required" })
    .max(50, { message: "City name must be 50 characters or less" }),
  district: z
    .string()
    .toUpperCase()
    .min(1, { message: "District selection is required" })
    .max(50, { message: "District selection must be 50 characters or less" }),
  addressEvent: z
    .string()
    .min(1, { message: "Address is required" })
    .max(50, { message: "Address must be 50 characters or less" }),
})