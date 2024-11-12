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
  .refine(
    (data) => {
      // Jika endDate berbeda dari startDate, maka validasi waktu diabaikan
      if (data.endDate.toDateString() !== data.startDate.toDateString()) {
        return true;
      }
      // Jika endDate sama dengan startDate, maka endTime harus lebih akhir dari startTime
      return data.endTime > data.startTime;
    },

    {
      message: "End time cannot be earlier than start time on the same day.",
      path: ["endTime"],
    }

  );

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

  export const priceSchema = (backendLowestPrice, backendHighestPrice) =>
    z
      .object({
        tempLowestPrice: z
          .string()
          .min(1, { message: "Lowest price is required" })
          .refine(
            (value) => {
              // Remove commas and validate digits only
              const cleanedValue = value.replace(/,/g, '');
              return /^\d+$/.test(cleanedValue);
            },
            {
              message: "Lowest price must be a valid number without commas",
            }
          )
          .transform((value) => {
            // Remove commas and parse to integer
            const cleanedValue = value.replace(/,/g, '');
            return parseInt(cleanedValue, 10);
          })
          .refine((value) => value > 0, {
            message: "Lowest price must be greater than 0",
          })
          .refine((value) => backendLowestPrice == null || value >= backendLowestPrice, {
            message: `Lowest price must be at least ${backendLowestPrice}`,
          }),
  
        tempHighestPrice: z
          .string()
          .min(1, { message: "Highest price is required" })
          .refine(
            (value) => {
              // Remove commas and validate digits only
              const cleanedValue = value.replace(/,/g, '');
              return /^\d+$/.test(cleanedValue);
            },
            {
              message: "Highest price must be a valid number without commas",
            }
          )
          .transform((value) => {
            // Remove commas and parse to integer
            const cleanedValue = value.replace(/,/g, '');
            return parseInt(cleanedValue, 10);
          })
          .refine((value) => value > 0, {
            message: "Highest price must be greater than 0",
          })
          .refine((value) => backendHighestPrice == null || value <= backendHighestPrice, {
            message: `Highest price must not exceed ${backendHighestPrice}`,
          }),
      })
      .refine(
        (data) => data.tempHighestPrice >= data.tempLowestPrice,
        {
          message: "Highest price must be greater than or equal to lowest price",
          path: ["tempHighestPrice"],
        }
      );

  export const withdrawSchema = (userBalance) => {
    return z
      .object({
        amount: z
          .string()
          .min(1, { message: "Amount is required" })
          .refine((value) => /^\d+$/.test(value.replace(/,/g, "")), {
            message: "Amount must be a valid number",
          })
          .transform((value) => parseInt(value.replace(/,/g, ""), 10))
          .refine((value) => value >= 100000, {
            message: "Amount must be greater than 100000",
          }),
      })
      .refine((data) => data.amount <= userBalance, {
        message: "Amount must be less than or equal to your balance",
        path: ["amount"],
      });
  }

  export const productSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be 50 characters or less" }),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description must be 500 characters or less" }),
    price: z
      .string()
      .min(1, { message: "Price is required" })
      .refine((value) => /^\d+$/.test(value.replace(/,/g, "")), {
        message: "Price must be a valid number",
      })
      .transform((value) => parseInt(value.replace(/,/g, ""), 10))
      .refine((value) => value > 0, {
        message: "Price must be greater than 0",
      }),
    qty: z
      .string()
      .min(1, { message: "Quantity is required" })
      .refine((value) => /^\d+$/.test(value.replace(/,/g, "")), {
        message: "Quantity must be a valid number",
      })
      .transform((value) => parseInt(value.replace(/,/g, ""), 10))
      .refine((value) => value > 0, {
        message: "Quantity must be greater than 0",
      }),
      productUnit: z.enum(["PCS", "DAY"], {
        message: "Unit must be either 'PCS' or 'DAY'",
      }),
      categoryId : z
      .string()
      .min(1, { message: "Category is required" })
      .max(50, { message: "Category must be 50 characters or less" }),

  });