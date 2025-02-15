import { z } from "zod";

export const createCollegeRequest = z.object({
  name: z.string().min(1, "Name is required"),
});

export const updateCollegeRequest = z.object({
  name: z.string().optional(),
});
