import { z } from "zod";

export const paymentRequest = z.object({
  bookingId: z.string().min(1, "booking id is required")
});
