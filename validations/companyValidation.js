import { z } from "zod";

export const createCompanyRequest = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  logoUrl: z.string().url("Invalid URL format"),
});

export const updateCompanyRequest = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().url("Invalid URL format").optional(),
});

export const deleteCompanyRequest = z.object({
  id: z.string().uuid("Invalid company ID format"),
});

export const companyResponse = z.object({
  id: z.number(), // Change id from z.string().uuid() to z.number()
  name: z.string(),
  description: z.string().nullable(),
  logoUrl: z.string().url().optional(), // Make logoUrl optional if not always present
});
