import { z } from "zod";

export const paymentInitiateRequest = z.object({
  bookingId: z.string().min(1, "booking id is required")
});

export const paymentInitiateResponse = z.object({
  orderId: z.string().min(10, "order id is required"),
  amount: z.number().min(0),
  currency: z.string().min(3, "currency is required")
});
