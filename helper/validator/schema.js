import { parse } from "expo-linking";
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

export const eventDateSchema = z
  .object({
    startDate: z.coerce.date().refine(
      (date) => {
        const today = new Date();
        const daysDifference = Math.floor(
          (date - today) / (1000 * 60 * 60 * 24)
        );
        return daysDifference >= 7;
      },
      {
        message: "Event must be scheduled at least 7 days in advance.",
      }
    ),
    startTime: z.date(),
    endDate: z.date(),
    endTime: z.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  })
  .refine((data) => data.endTime >= data.startTime, {
    message: "End time cannot be earlier than start time.",
    path: ["endTime"],
  });

export const eventThemeSchema = z.object({
  themeEvent: z
    .string()
    .min(1, { message: "Theme is required" })
    .max(50, { message: "Theme must be 50 characters or less" }),
});

export const eventCapacitySchema = z
  .object({
    capacityEvent: z
      .string()
      .min(1, { message: "Capacity is required" })

      .max(10, { message: "Capacity must be 50 characters or less" })
      .regex(/^[0-9]+$/, {
        message: "Capacity must be a positive numeric value",
      }), // Only allows numbers
  })
  .refine((data) => parseInt(data.capacityEvent) < 10000, {
    message: "Capacity must be less than 500",
    path: ["capacityEvent"],
  });

export const priceSchema = z
  .object({
    tempLowestPrice: z
      .string()
      .min(1, { message: "Lowest price is required" })
      .refine((value) => /^\d+$/.test(value.replace(/,/g, "")), {
        message: "Lowest price must be a valid number",
      })
      .transform((value) => parseInt(value.replace(/,/g, ""), 10))
      .refine((value) => value > 0, {
        message: "Lowest price must be greater than 0",
      }),

    tempHighestPrice: z
      .string()
      .min(1, { message: "Highest price is required" })
      .refine((value) => /^\d+$/.test(value.replace(/,/g, "")), {
        message: "Highest price must be a valid number",
      })
      .transform((value) => parseInt(value.replace(/,/g, ""), 10))
      .refine((value) => value > 0, {
        message: "Highest price must be greater than 0",
      }),
  }) .refine(
    (data) => data.tempHighestPrice >= data.tempLowestPrice,
    {
      message: "Highest price must be greater than or equal to lowest price",
      path: ["tempHighestPrice"],
    }
  );